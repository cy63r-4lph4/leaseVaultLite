import { NextResponse } from "next/server";
import { Synapse, RPC_URLS, TOKENS, CONTRACT_ADDRESSES } from "@filoz/synapse-sdk";
import { ethers, type BigNumberish } from "ethers";
import artifact from "@/lib/LeaseVaultAbi.json";
import type { InterfaceAbi } from "ethers";

const RELAYER_PRIVATE_KEY = process.env.RELAYER_PRIVATE_KEY!;
const LEASE_VAULT_ADDRESS = process.env.LEASE_VAULT_ADDRESS!;
const RPC_URL = process.env.RPC_URL!;

const abi = artifact.abi as InterfaceAbi;

let synapse: Synapse | null = null;

async function initSynapse(): Promise<Synapse> {
  if (!synapse) {
    synapse = await Synapse.create({
      privateKey: RELAYER_PRIVATE_KEY,
      rpcURL: RPC_URLS.calibration.websocket,
    });

    try {
      await synapse.payments.deposit(ethers.parseUnits("10", 18), TOKENS.USDFC);
      await synapse.payments.approveService(
        CONTRACT_ADDRESSES.PANDORA_SERVICE[synapse.getNetwork()],
        ethers.parseUnits("1", 18),
        ethers.parseUnits("100", 18)
      );
    } catch (err) {
      console.warn("⚠️ Deposit/approve skipped (may already exist):", err instanceof Error ? err.message : err);
    }
  }
  return synapse;
}

interface PropertyForm {
  title: string;
  description: string;
  rentAmount: string;
  depositAmount: string;
  userAddress: string;
  location?: string;
  beds?: string;
  baths?: string;
  sqft?: string;
  propertyType?: string;
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const getField = (key: string): string => form.get(key)?.toString() ?? "";

    const property: PropertyForm = {
      title: getField("title"),
      description: getField("description"),
      rentAmount: getField("rentAmount"),
      depositAmount: getField("depositAmount"),
      userAddress: getField("userAddress"),
      location: getField("location"),
      beds: getField("beds"),
      baths: getField("baths"),
      sqft: getField("sqft"),
      propertyType: getField("propertyType"),
    };

    if (!property.title || !property.description || !property.userAddress) {
      return NextResponse.json({ step: "validation", error: "Missing required fields" }, { status: 400 });
    }

    let rentAmount: BigNumberish;
    let depositAmount: BigNumberish;
    try {
      rentAmount = ethers.parseUnits(property.rentAmount || "0", 18);
      depositAmount = ethers.parseUnits(property.depositAmount || "0", 18);
    } catch (err) {
      return NextResponse.json({ step: "parse-units", error: err instanceof Error ? err.message : "Invalid amount" }, { status: 500 });
    }

    // --- Upload metadata
    const metadata = {
      title: property.title,
      description: property.description,
      location: property.location,
      beds: property.beds,
      baths: property.baths,
      sqft: property.sqft,
      propertyType: property.propertyType,
      createdAt: Date.now(),
    };

    let commp: string;
    try {
      const syn = await initSynapse();
      const storage = await syn.createStorage();

      const metadataBlob = new Blob([JSON.stringify(metadata)], { type: "application/json" });
      const metadataFile = new File([await metadataBlob.arrayBuffer()], "metadata.json", { type: "application/json" });
      const uploadResult = await storage.upload(new TextEncoder().encode(await metadataFile.text()));
      commp = uploadResult.commp.toString();
    } catch (err) {
      return NextResponse.json({ step: "upload-metadata", error: err instanceof Error ? err.message : "Upload failed" }, { status: 500 });
    }

    // --- Blockchain transaction
    let receipt;
    try {
      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const wallet = new ethers.Wallet(RELAYER_PRIVATE_KEY, provider);
      const contract = new ethers.Contract(LEASE_VAULT_ADDRESS, abi, wallet);

      const tx = await contract.listProperty(property.userAddress, rentAmount, depositAmount, commp);
      receipt = await tx.wait();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Contract execution failed";
      return NextResponse.json({ step: "contract-call", error: msg }, { status: 500 });
    }

    return NextResponse.json({ success: true, commp, txHash: receipt.transactionHash });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected server error";
    return NextResponse.json({ step: "unknown", error: message }, { status: 500 });
  }
}
