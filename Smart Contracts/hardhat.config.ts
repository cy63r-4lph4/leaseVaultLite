import type { HardhatUserConfig } from "hardhat/config";
import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { configVariable } from "hardhat/config";
import "dotenv/config";
import "@nomicfoundation/hardhat-verify";

interface ExtendedHardhatUserConfig extends HardhatUserConfig {
  etherscan?: {
    apiKey: Record<string, string>;
    customChains?: {
      network: string;
      chainId: number;
      urls: { apiURL: string; browserURL: string };
    }[];
  };
  sourcify?: { enabled: boolean };
}

const config: ExtendedHardhatUserConfig = {
  plugins: [hardhatToolboxViemPlugin],
  solidity: {
    profiles: {
      default: { version: "0.8.28" },
      production: {
        version: "0.8.28",
        settings: { optimizer: { enabled: true, runs: 200 } },
      },
    },
  },
  networks: {
    lisk: {
      type: "http",
      chainType: "l1",
      url: configVariable("LISK_SEPOLIA_RPC_URL"),
      accounts: [configVariable("LISK_SEPOLIA_PRIVATE_KEY")],
    },
  },
  etherscan: {
    apiKey: { "lisk-sepolia": "123" },
    customChains: [
      {
        network: "lisk-sepolia",
        chainId: 4202,
        urls: {
          apiURL: "https://sepolia-blockscout.lisk.com/api",
          browserURL: "https://sepolia-blockscout.lisk.com",
        },
      },
    ],
  },
  sourcify: { enabled: false },
};

export default config;
