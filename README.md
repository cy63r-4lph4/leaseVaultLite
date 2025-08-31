# 🏠 LeaseVault Lite

> “You don’t need to trust. The Verse trusts for you.”

LeaseVault Lite is a **trustless rental protocol** powered by **CØRE tokens**.  
It redefines renting by putting **security deposits, rent payments, and receipts fully on-chain**, while storing off-chain property data (images, metadata) with **Filecoin + Synapse SDK**.

Coded with ⚡love by **Cy63r_4lph4~🐉**

---

## ✨ Why LeaseVault Lite?

Traditional renting is broken:

- ❌ No transparency between landlords & tenants.
- ❌ Hidden fees, unfair evictions, and disputes.
- ❌ No verifiable receipts or history.

LeaseVault Lite solves this by:

- ✅ **One-time deposit upfront** → landlord is secure.
- ✅ **Manual recurring rent** → tenant is in control.
- ✅ **On-chain receipts** → disputes eliminated.
- ✅ **Notifications** → no more “I forgot to pay.”
- ✅ **Trustless enforcement** → the protocol _is_ the middleman.

---

## 🔑 Why CØRE Tokens (instead of ETH/USDC)?

- 🚀 **Gasless onboarding** with proxy relayer → tenants/landlords don’t need ETH.
- 🎁 **Faucet drop at profile creation** → anyone can test instantly.
- 🌐 **Unified token across the 4lph4Verse** → LeaseVault, HireX, E-Chain, VaultOfLove.
- 🔒 **Beyond payments** → CØRE is the **trust layer** of the ecosystem.

CØRE isn’t just a token.  
It’s the **heartbeat of a trustless verse**.

---

## 🛠️ Tech Stack

- **Smart Contracts** → Solidity (ProfileManager + LeaseManager).
- **Frontend** → Next.js + TailwindCSS (epic Web3 vibes ✨).
- **Storage** → Filecoin + Synapse SDK (for images & metadata).
- **Wallet & Relayer** → Viem/Wagmi + proxy transactions for gas abstraction.

---

## 🧩 Core Architecture

Tenant ↔ LeaseVault Lite (Smart Contracts) ↔ Landlord
↕
Filecoin + Synapse (off-chain images, docs)
↕
CØRE Token (faucet + trust layer)

yaml
Copy code

---

## 🚀 Features

- 🧑‍💼 **Profile System** with faucet rewards.
- 🏡 **On-chain property listings** (secured by landlord).
- 📜 **Lease requests & approvals** (tenant → landlord).
- 💰 **Security deposit upfront** (no cheating).
- 🧾 **Rent receipts minted** for every payment.
- ⏰ **Notifications & due reminders**.
- 🔒 **Trustless dispute resolution** (the code is law).

---

## 🧪 Quickstart

1. Clone the repo:
   ```bash
   git clone https://github.com/cy63r-4lph4/leaseVaultLite.git
   cd LeaseVaultLite
   Install dependencies:
   ```

bash
Copy code
cd contracts && npm install
cd ../frontend && npm install
Deploy contracts (Hardhat):

bash
Copy code
npx hardhat run scripts/deploy.js --network testnet
Run frontend (Next.js):

bash
Copy code
cd frontend
npm run dev

🎯 Roadmap
MVP: Profile + Listings + Leases + Receipts.

Gasless UX with relayer.

Notifications via push protocol.

Expand into full LeaseVault (property sales + ID verification).

Cross-integration with HireX & VaultOfLove.

👑 Vision
LeaseVault Lite is just the beginning.
The mission is to redefine digital trust across renting, hiring, governance, and creativity — all powered by CØRE.

Welcome to the 4lph4Verse.
Trustless. Transparent. Eternal.

🐉 Credits
Coded with ⚡love by Cy63r_4lph4~🐉
for the Aleph Hackathon 2025.

Contract Addreses
easeVaultLiteModule#Alph4Core - 0xe093E6E7F3dCC8605252c9fC9E6911A7D85D3809
LeaseVaultLiteModule#ProfileSystem - 0x710A01A2c45dC5b9f27Be530a1b1D973238D3808
LeaseVaultLiteModule#LeaseVault - 0x8b1f27B16FA8a592e724590F7055883AA92457A2

Frontend Url
https://lease-vault-lite.vercel.app/
