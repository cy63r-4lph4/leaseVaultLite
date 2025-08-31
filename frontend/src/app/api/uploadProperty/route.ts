import { NextResponse } from "next/server";
import {
  Synapse,
  RPC_URLS,
  TOKENS,
  CONTRACT_ADDRESSES,
} from "@filoz/synapse-sdk";
import { ethers } from "ethers";
import artifact from "@/lib/LeaseVaultAbi.json";
import type { InterfaceAbi } from "ethers";

const RELAYER_PRIVATE_KEY = process.env.RELAYER_PRIVATE_KEY!;
const LEASE_VAULT_ADDRESS = process.env.LEASE_VAULT_ADDRESS!;
const RPC_URL = process.env.RPC_URL!;

const abi = artifact.abi as InterfaceAbi;

let synapse: Synapse | null = null;

async function initSynapse() {
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
    } catch (e: any) {
      console.warn(
        "⚠️ Deposit/approve skipped (may already exist):",
        e?.message || e
      );
    }
  }
  return synapse;
}

export async function POST(req: Request) {
  try {
    // --- 1. Parse form
    let form;
    try {
      form = await req.formData();
    } catch (err) {
      console.error("❌ Error parsing form data:", err);
      return NextResponse.json(
        { step: "parse-form", error: (err as any).message },
        { status: 500 }
      );
    }

    const title = form.get("title")?.toString() ?? "";
    const description = form.get("description")?.toString() ?? "";
    const rent = form.get("rentAmount")?.toString() ?? "0";
    const deposit = form.get("depositAmount")?.toString() ?? "0";
    const userAddress = form.get("userAddress")?.toString() ?? "";
    const location = form.get("location")?.toString() ?? "";
    const beds = form.get("beds")?.toString() ?? "";
    const baths = form.get("baths")?.toString() ?? "";
    const sqft = form.get("sqft")?.toString() ?? "";
    const propertyType = form.get("propertyType")?.toString() ?? "";

    if (!title || !description || !userAddress) {
      return NextResponse.json(
        { step: "validation", error: "Missing required fields" },
        { status: 400 }
      );
    }

    let rentAmount, depositAmount;
    try {
      rentAmount = ethers.parseUnits(rent, 18);
      depositAmount = ethers.parseUnits(deposit, 18);
    } catch (err) {
      console.error("❌ Error parsing amounts:", err);
      return NextResponse.json(
        { step: "parse-units", error: (err as any).message },
        { status: 500 }
      );
    }

    // --- 2. Upload metadata
    const metadata: any = {
      title,
      description,
      location,
      beds,
      baths,
      sqft,
      propertyType,
      createdAt: Date.now(),
    };

    let commp;
    try {
      const syn = await initSynapse();
      const storage = await syn.createStorage();

      const metadataBlob = new Blob([JSON.stringify(metadata)], {
        type: "application/json",
      });
      const metadataFile = new File(
        [await metadataBlob.arrayBuffer()],
        "metadata.json",
        { type: "application/json" }
      );
      const uploadResult = await storage.upload(
        new TextEncoder().encode(await metadataFile.text())
      );
      commp = uploadResult.commp;
    } catch (err) {
      console.error("❌ Error uploading metadata to Synapse:", err);
      return NextResponse.json(
        { step: "upload-metadata", error: (err as any).message },
        { status: 500 }
      );
    }

    // --- 3. Blockchain transaction
    let receipt;
    try {
      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const wallet = new ethers.Wallet(RELAYER_PRIVATE_KEY, provider);
      const contract = new ethers.Contract(LEASE_VAULT_ADDRESS, abi, wallet);

      const tx = await contract.listProperty(
        userAddress,
        rentAmount,
        depositAmount,
        commp
      );
      receipt = await tx.wait();
    } catch (err: any) {
      console.error("❌ Error calling smart contract:", {
        message: err?.message,
        reason: err?.reason,
        code: err?.code,
        data: err?.data,
        stack: err?.stack,
      });
      return NextResponse.json(
        {
          step: "contract-call",
          error: err?.reason || err?.message || "Contract execution failed",
        },
        { status: 500 }
      );
    }

    // --- 4. Success
    return NextResponse.json({
      success: true,
      commp,
      txHash: receipt.transactionHash,
    });
  } catch (err: any) {
    console.error("❌ Unknown server error:", err);
    return NextResponse.json(
      { step: "unknown", error: err?.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}
