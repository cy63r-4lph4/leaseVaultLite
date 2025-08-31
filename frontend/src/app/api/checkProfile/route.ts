// app/api/checkProfile/route.ts
import { NextResponse } from "next/server";
import { ethers } from "ethers";
import artifact from "@/lib/ProfileSystemAbi.json";
import type { InterfaceAbi } from "ethers";

const abi = artifact.abi as InterfaceAbi;

const RPC_URL = process.env.RPC_URL!;
const PROFILE_SYSTEM_ADDRESS = process.env.PROFILE_SYSTEM_ADDRESS!;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json({ error: "Missing address" }, { status: 400 });
    }

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(PROFILE_SYSTEM_ADDRESS, abi, provider);

    const exists: boolean = await contract.profileExists(address);

    if (!exists) {
      return NextResponse.json({ exists: false, profile: null });
    }

    const profile = await contract.getProfile(address);

    return NextResponse.json({
      exists: true,
      profile: {
        user: profile.user,
        role: Number(profile.role),
        reputation: Number(profile.reputation),
        metadataCID: profile.metadataCID,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("checkProfile error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

