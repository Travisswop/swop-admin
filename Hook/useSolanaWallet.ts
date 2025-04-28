"use client";
import { SolanaService } from "@/services/token-service";
import { useEffect, useRef, useState } from "react";

interface TokenData {
  mint: string;
  amount: number;
  chain: string;
  name: string;
  symbol: string;
  marketData: any;
  sparklineData: any;
  isNative: boolean;
  decimals: number;
  balance: number;
  address: string;
}

export const useSolanaWallet = (walletAddress: string) => {
  const [data, setData] = useState<TokenData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!walletAddress) return;

    const fetchWalletData = async () => {
      setLoading(true);
      setError(null);

      // Cancel any previous request
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        const solWalletData = await SolanaService.getSplTokens(walletAddress);

        const formattedData: TokenData[] = solWalletData.map((token: any) => ({
          mint: token.mint ?? "",
          amount: token.amount ?? 0,
          chain: token.chain ?? "",
          name: token.name ?? "",
          symbol: token.symbol ?? "",
          marketData: token.marketData ?? {},
          sparklineData: token.sparklineData ?? [],
          isNative: token.isNative ?? false,
          decimals: token.decimals ?? 0,
          balance: token.balance ?? 0,
          address: token.address ?? "",
        }));

        setData(formattedData);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError("Failed to fetch wallet data");
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();

    // Clean up if walletAddress changes or component unmounts
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [walletAddress]);

  return { data, loading, error };
};
