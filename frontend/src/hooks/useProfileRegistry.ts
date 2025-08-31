"use client";

import { Profile } from "@/lib/Interfaces";
import { useEffect, useState } from "react";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";



export function useGaslessProfile() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  async function createProfile(role: number, metadataCID: string) {
    if (!address) throw new Error("Wallet not connected");

    const message = `Create profile for ${address} with role=${role} and metadata=${metadataCID}`;
    const signature = await signMessageAsync({ message });

    const res = await fetch("/api/createProfile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, role, metadataCID, signature }),
    });

    return res.json();
  }

  return { createProfile };
}

export function useGetProfileStatus() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { createProfile } = useGaslessProfile();

  const [checking, setChecking] = useState(false);
  const [exists, setExists] = useState<boolean | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function ensureProfile() {
      if (!isConnected || !address || checking) return;

      setChecking(true);
      try {
        const res = await fetch(`/api/checkProfile?address=${address}`);
        const data = await res.json();

        setExists(data.exists);

        if (!data.exists) {
          await createProfile(1, "QmSomeFileCoinHash");
          setExists(true);
        } else {
          setProfile(data.profile);
        }
      } catch (err: any) {
        console.error("Profile creation cancelled:", err);
        disconnect(); 
      } finally {
        setChecking(false);
      }
    }

    ensureProfile();
  }, [isConnected, address]);

  return { checking, exists, profile };
}
