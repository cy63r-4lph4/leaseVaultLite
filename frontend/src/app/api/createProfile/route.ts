import { NextResponse } from "next/server";
import { ethers } from "ethers";
import artifact from "@/lib/ProfileSystemAbi.json";
import type { InterfaceAbi } from "ethers";

const abi = artifact.abi as InterfaceAbi;

const RPC_URL = process.env.RPC_URL!;
const RELAYER_PRIVATE_KEY = process.env.RELAYER_PRIVATE_KEY!;
const PROFILE_SYSTEM_ADDRESS = process.env.PROFILE_SYSTEM_ADDRESS!;

export async function POST(req: Request) {
  try {
    const body: {
      address?: string;
      role?: number;
      metadataCID?: string;
      signature?: string;
    } = await req.json();

    const { address, role, metadataCID, signature } = body;

    if (!address || role === undefined || !metadataCID || !signature) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    const message = `Create profile for ${address} with role=${role} and metadata=${metadataCID}`;
    const recovered = ethers.verifyMessage(message, signature);

    if (recovered.toLowerCase() !== address.toLowerCase()) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(RELAYER_PRIVATE_KEY, provider);

    const contract = new ethers.Contract(PROFILE_SYSTEM_ADDRESS, abi, wallet);

    try {
      const tx = await contract.createProfile(address, role, metadataCID);
      const receipt = await tx.wait();

      return NextResponse.json({
        success: true,
        txHash: receipt.transactionHash,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Unknown contract error";

      if (errorMessage.includes("Profile already exists")) {
        return NextResponse.json(
          { success: false, error: "Profile already exists" },
          { status: 409 }
        );
      }

      if (errorMessage.includes("Not enough tokens in ProfileSystem")) {
        return NextResponse.json(
          { success: false, error: "Insufficient airdrop tokens in contract" },
          { status: 402 }
        );
      }

      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    console.error("Unexpected server error:", err);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
