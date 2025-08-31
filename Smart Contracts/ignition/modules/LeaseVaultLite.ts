import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LeaseVaultLiteModule = buildModule("LeaseVaultLiteModule", (m) => {
  // Deploy Alph4Core with 100 million cap (adjust if needed)
  const alph4Core = m.contract("Alph4Core", [100_000_000]);

  // Deploy ProfileSystem with token address and 100 token airdrop
  const profileSystem = m.contract("ProfileSystem", [
    alph4Core,
    100, // airdrop amount
  ]);

  // Deploy LeaseVault with token + profile system
  const leaseVault = m.contract("LeaseVault", [alph4Core, profileSystem]);

  // Set LeaseVault in ProfileSystem (post-deploy action)
  m.call(profileSystem, "setLeaseVault", [leaseVault]);

  return { alph4Core, profileSystem, leaseVault };
});

export default LeaseVaultLiteModule;
