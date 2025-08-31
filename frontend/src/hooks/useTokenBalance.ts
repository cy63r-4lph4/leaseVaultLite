import { useReadContract, useAccount } from "wagmi";
import { formatUnits } from "viem";

const erc20Abi = [
  {
    constant: true,
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    type: "function",
  },
];

function formatCompactNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(2).replace(/\.00$/, "") + "B";
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M";
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(2).replace(/\.00$/, "") + "K";
  }
  return value.toFixed(2).replace(/\.00$/, "");
}

export function useTokenBalance(
  tokenAddress: `0x${string}`,
  decimals: number,
  symbol?: string
) {
  const { address } = useAccount();

  const { data, isLoading, error } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const balance = data ? parseFloat(formatUnits(data, decimals)) : 0;

  const formattedBalance = data
    ? `${formatCompactNumber(balance)}${symbol ? ` ${symbol}` : ""}`
    : null;

  return {
    balance,
    formattedBalance,
    isLoading,
    error,
  };
}
