// "use client";

// import { fetchPrice } from "@/components/wallet/tools/fetch_price";
// import { CHAINS } from "@/types/config";
// import { EVMChain, MarketData } from "@/types/token";

// import { getAccount, getAssociatedTokenAddress } from "@solana/spl-token";
// import { Connection, ParsedAccountData, PublicKey } from "@solana/web3.js";

// // --- Types ---
// interface TokenAccount {
//   pubkey: PublicKey;
//   account: {
//     data: ParsedAccountData;
//   };
// }

// interface TokenInfo {
//   decimals: number;
//   balance: string;
//   address: string;
//   chain: string;
//   name: string;
//   symbol: string;
//   marketData: MarketData;
//   sparklineData: any[];
//   isNative: boolean;
// }

// interface NativeSolToken {
//   symbol: string;
//   name: string;
//   decimals: number;
//   address: null;
//   chain: string;
//   marketData: MarketData;
//   sparklineData: any[];
//   isNative: true;
// }

// const SWOP_TOKEN = {
//   name: "Swop",
//   symbol: "SWOP",
//   address: "GAehkgN1ZDNvavX81FmzCcwRnzekKMkSyUNq8WkMsjX1",
//   decimals: 9,
//   balance: "0",
//   chain: "SOLANA",
//   logoURI: "/swop.png",
//   marketData: {
//     price: "0",
//     uuid: "swop",
//     symbol: "SWOP",
//     name: "Swop",
//     color: "#000000",
//     marketCap: "0",
//     "24hVolume": "0",
//     iconUrl: "/swop.png",
//     listedAt: 0,
//     tier: 0,
//     change: "0",
//     rank: 0,
//     sparkline: [],
//     lowVolume: false,
//     coinrankingUrl: "",
//     btcPrice: "0",
//     contractAddresses: [],
//   },
//   sparklineData: [],
//   timeSeriesData: {
//     "1H": [],
//     "1D": [],
//     "1W": [],
//     "1M": [],
//     "1Y": [],
//   },
//   nativeTokenPrice: 0,
//   isNative: false,
// } as const;

// // --- Utility Function ---
// const processSparklineData = (timeSeriesData: any) => {
//   return timeSeriesData?.history || [];
// };

// // --- API Services ---
// export class TokenAPIService {
//   private static async fetchWithRetry(
//     url: string,
//     options: RequestInit,
//     retries = 3
//   ): Promise<Response> {
//     try {
//       const response = await fetch(url, options);
//       if (!response.ok)
//         throw new Error(`HTTP error! status: ${response.status}`);
//       return response;
//     } catch (error) {
//       if (retries > 0) {
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         return this.fetchWithRetry(url, options, retries - 1);
//       }
//       throw error;
//     }
//   }

//   static async getTokenBalances(chain: EVMChain, address: string) {
//     const response = await this.fetchWithRetry(CHAINS[chain].alchemyUrl!, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         jsonrpc: "2.0",
//         method: "alchemy_getTokenBalances",
//         params: [address, "erc20"],
//         id: 42,
//       }),
//     });

//     const { result } = await response.json();
//     return (
//       result.tokenBalances?.filter(
//         (token: { tokenBalance: string }) => BigInt(token.tokenBalance) > 0
//       ) || []
//     );
//   }

//   static async getMarketData(params: {
//     address?: string;
//     uuid?: string;
//   }): Promise<MarketData | null> {
//     const queryParam = params.address
//       ? `contractAddresses[]=${params.address}`
//       : `uuids[]=${params.uuid}`;

//     const response = await this.fetchWithRetry(
//       `https://api.coinranking.com/v2/coins?${queryParam}`,
//       {
//         headers: {
//           "x-access-token": process.env.NEXT_PUBLIC_COIN_RANKING_API_KEY || "",
//         },
//       }
//     );

//     const result = await response.json();
//     return result.data?.coins?.[0] || null;
//   }

//   static async getTokensData(addresses: string[]) {
//     const url = `https://api.coinranking.com/v2/coins?${addresses
//       .map((address) => `contractAddresses[]=${address}`)
//       .join("&")}`;

//     const response = await fetch(url, {
//       headers: {
//         "x-access-token": process.env.NEXT_PUBLIC_COIN_RANKING_API_KEY || "",
//       },
//     });

//     const result = await response.json();
//     return result.data?.coins || [];
//   }

//   static async getTimeSeriesData(uuid: string, period = "1h") {
//     const response = await this.fetchWithRetry(
//       `https://api.coinranking.com/v2/coin/${uuid}/history?timePeriod=${period}`,
//       {
//         headers: {
//           "x-access-token": process.env.NEXT_PUBLIC_COIN_RANKING_API_KEY || "",
//         },
//       }
//     );
//     const result = await response.json();
//     return result.data;
//   }
// }

// // --- Solana Service ---
// export class SolanaService {
//   static async getSplTokens(walletAddress: string) {
//     if (!walletAddress) return [];

//     try {
//       const connection = new Connection(
//         process.env.NEXT_PUBLIC_QUICKNODE_SOLANA_URL!,
//         "confirmed"
//       );
//       const publicKey = new PublicKey(walletAddress);

//       const [balance, tokenAccounts] = await Promise.all([
//         connection.getBalance(publicKey),
//         connection.getParsedTokenAccountsByOwner(publicKey, {
//           programId: new PublicKey(
//             "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
//           ),
//         }),
//       ]);

//       const solToken =
//         balance > 0 ? await this.getNativeSolToken(balance) : null;

//       const tokenData = await this.getTokenAccountsData(tokenAccounts.value);

//       const swopTokenBalance = await this.getSwopTokenBalance(walletAddress);

//       const tokens: (TokenInfo | NativeSolToken)[] = [
//         swopTokenBalance
//           ? {
//               ...SWOP_TOKEN,
//               balance: (
//                 Number(swopTokenBalance) / Math.pow(10, SWOP_TOKEN.decimals)
//               ).toString(),
//               address: SWOP_TOKEN.address,
//               marketData: {
//                 ...SWOP_TOKEN.marketData,
//                 price: await this.fetchTokenPrice(SWOP_TOKEN.address),
//               },
//             }
//           : {
//               ...SWOP_TOKEN,
//               balance: "0",
//               address: "",
//             },
//         ...(solToken ? [solToken] : []),
//         ...tokenData,
//       ];

//       return tokens;
//     } catch (error) {
//       console.error("Error fetching Solana tokens:", error);
//       return [];
//     }
//   }

//   private static async getNativeSolToken(balance?: number) {
//     try {
//       const nativeSol = CHAINS.SOLANA.nativeToken;
//       const marketData = await TokenAPIService.getMarketData({
//         uuid: nativeSol.uuid,
//       });

//       if (!marketData) {
//         console.error("Failed to fetch SOL market data");
//         return null;
//       }

//       const timeSeriesData = await TokenAPIService.getTimeSeriesData(
//         marketData.uuid
//       );

//       return {
//         symbol: nativeSol.symbol,
//         name: nativeSol.name,
//         decimals: nativeSol.decimals,
//         address: null,
//         chain: "SOLANA",
//         marketData,
//         sparklineData: processSparklineData(timeSeriesData),
//         isNative: true,
//         balance: balance
//           ? (balance / Math.pow(10, nativeSol.decimals)).toString()
//           : "0",
//       };
//     } catch (error) {
//       console.error("Error fetching native SOL token:", error);
//       return null;
//     }
//   }

//   private static async getTokenAccountsData(tokenAccounts: TokenAccount[]) {
//     const tokens = tokenAccounts.map((token) => {
//       const info = token.account.data.parsed.info;
//       return {
//         decimals: info.tokenAmount.decimals,
//         balance: info.tokenAmount.uiAmountString,
//         address: info.mint,
//       };
//     });

//     const tokenData = await Promise.all(
//       tokens.map(async (token) => {
//         const marketData = await TokenAPIService.getMarketData({
//           address: token.address,
//         });
//         if (!marketData) return null;

//         const timeSeriesData = await TokenAPIService.getTimeSeriesData(
//           marketData.uuid
//         );

//         return {
//           ...token,
//           chain: "SOLANA",
//           name: marketData.name,
//           symbol: marketData.symbol,
//           marketData,
//           sparklineData: processSparklineData(timeSeriesData),
//           isNative: false,
//         };
//       })
//     );

//     return tokenData.filter(Boolean) as TokenInfo[];
//   }

//   private static async getSwopTokenBalance(walletAddress: string) {
//     try {
//       const connection = new Connection(
//         process.env.NEXT_PUBLIC_QUICKNODE_SOLANA_URL!,
//         "confirmed"
//       );
//       const publicKey = new PublicKey(walletAddress);
//       const swopToken = new PublicKey(SWOP_TOKEN.address);

//       const associatedTokenAddress = await getAssociatedTokenAddress(
//         swopToken,
//         publicKey
//       );
//       const tokenAccount = await getAccount(connection, associatedTokenAddress);

//       return tokenAccount.amount;
//     } catch (error) {
//       console.error("Error fetching SWOP token balance:", error);
//       return null;
//     }
//   }

//   private static async fetchTokenPrice(mint: string) {
//     return fetchPrice(new PublicKey(mint));
//   }
// }
"use client";

import { fetchPrice } from "@/components/wallet/tools/fetch_price";
import { CHAINS } from "@/types/config";
import {
  ChainType,
  EVMChain,
  MarketData,
  SolanaTokenData,
  TimeSeriesDataPoint,
} from "@/types/token";
import { getAccount, getAssociatedTokenAddress } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { ethers } from "ethers";

interface TokenAccount {
  account: SolanaTokenData;
  pubkey: PublicKey;
}

const SWOP_TOKEN: any = {
  name: "Swop",
  symbol: "SWOP",
  address: "GAehkgN1ZDNvavX81FmzCcwRnzekKMkSyUNq8WkMsjX1",
  decimals: 9,
  balance: "0",
  chain: "SOLANA",
  logoURI: "/swop.png",
  marketData: {
    price: "0",
    uuid: "swop",
    symbol: "SWOP",
    name: "Swop",
    color: "#000000",
    marketCap: "0",
    "24hVolume": "0",
    iconUrl: "/swop.png",
    listedAt: 0,
    tier: 0,
    change: "0",
    rank: 0,
    sparkline: [],
    lowVolume: false,
    coinrankingUrl: "",
    btcPrice: "0",
    contractAddresses: [],
  },
  sparklineData: [],
  timeSeriesData: {
    "1H": [],
    "1D": [],
    "1W": [],
    "1M": [],
    "1Y": [],
  },
  nativeTokenPrice: 0,
  isNative: false,
};

export class TokenAPIService {
  private static async fetchWithRetry(
    url: string,
    options: RequestInit,
    retries = 3
  ): Promise<Response> {
    try {
      const response = await fetch(url, options);
      if (!response.ok)
        throw new Error(`HTTP error!
        status: ${response.status}`);
      return response;
    } catch (error) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return this.fetchWithRetry(url, options, retries - -1);
      }
      throw error;
    }
  }

  static async getTokenBalances(chain: EVMChain, address: string) {
    const response = await this.fetchWithRetry(CHAINS[chain].alchemyUrl!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "alchemy_getTokenBalances",
        params: [address, "erc20"],
        id: 42,
      }),
    });
    const { result } = await response.json();

    return (
      result.tokenBalances?.filter(
        (token: { tokenBalance: string }) => BigInt(token.tokenBalance) > 0
      ) || []
    );
  }

  static async getMarketData(params: {
    address?: string;
    uuid?: string;
  }): Promise<MarketData | null> {
    const queryParam = params.address
      ? `contractAddresses[]=${params.address}`
      : `uuids[]=${params.uuid}`;

    const response = await this.fetchWithRetry(
      `https://api.coinranking.com/v2/coins?${queryParam}`,
      {
        headers: {
          "x-access-token": process.env.NEXT_PUBLIC_COIN_RANKING_API_KEY || "",
        },
      }
    );
    const result = await response.json();
    return result.data.coins[0] || null;
  }

  static async getTokensData(address: string[]) {
    const url = `https://api.coinranking.com/v2/coins?contractAddresses[]=${address.join(
      "&contractAddresses[]="
    )}`;

    const response = await fetch(url, {
      headers: {
        "x-access-token": process.env.NEXT_PUBLIC_COIN_RANKING_API_KEY || "",
      },
    });

    const result = await response.json();
    return result.data.coins;
  }

  static async getTimeSeriesData(uuid: string, period = "1h") {
    const response = await this.fetchWithRetry(
      `https://api.coinranking.com/v2/coin/${uuid}/history?timePeriod=${period}`,
      {
        headers: {
          "x-access-token": process.env.NEXT_PUBLIC_COIN_RANKING_API_KEY || "",
        },
      }
    );
    const result = await response.json();
    return result.data;
  }
}

export class TokenContractService {
  private static getContract(
    address: string,
    provider: ethers.JsonRpcProvider
  ) {
    return new ethers.Contract(
      address,
      [
        "function balanceOf(address) view returns (uint256)",
        "function decimals() view returns (uint8)",
        "function symbol() view returns (string)",
        "function name() view returns (string)",
      ],
      provider
    );
  }

  static async getTokenDetails(
    address: string,
    walletAddress: string,
    provider: ethers.JsonRpcProvider
  ) {
    try {
      const contract = this.getContract(address, provider);
      // Check if the contract is deployed and has the expected methods
      const isContract = (await provider.getCode(address)) !== "0x";
      if (!isContract) {
        console.error("Address is not a contract:", address);
        return null;
      }

      // Check if the contract has the required methods before calling them
      const balanceCall = contract.balanceOf(walletAddress);
      const decimalsCall = contract.decimals();
      const symbolCall = contract.symbol();
      const nameCall = contract.name();

      const [balance, decimals, symbol, name] = await Promise.all([
        balanceCall.catch(() => null), // Handle potential errors
        decimalsCall.catch(() => null),
        symbolCall.catch(() => null),
        nameCall.catch(() => null),
      ]);

      if (
        balance === null ||
        decimals === null ||
        symbol === null ||
        name === null
      ) {
        console.error("One or more token details could not be fetched:", {
          balance,
          decimals,
          symbol,
          name,
        });
        return null;
      }

      return {
        balance: ethers.formatUnits(balance, decimals),
        decimals,
        symbol,
        name,
      };
    } catch (error) {
      console.error("Error fetching token details:", error);
      return null;
    }
  }

  static async getNativeTokens(chain: ChainType) {
    if (!chain) return null;

    try {
      const nativeToken = await this.formatNativeToken(chain);
      return nativeToken;
    } catch (error) {
      console.error("Error fetching Solana tokens:", error);
      return null;
    }
  }

  private static async formatNativeToken(chain: ChainType) {
    const nativeToken = CHAINS[chain].nativeToken;
    const marketData = await TokenAPIService.getMarketData({
      uuid: nativeToken.uuid,
    });

    const timeSeriesData = await TokenAPIService.getTimeSeriesData(
      nativeToken.uuid
    );

    return {
      symbol: nativeToken.symbol,
      name: nativeToken.name,
      decimals: nativeToken.decimals,
      address: null,
      chain,
      logoURI: `/assets/crypto-icons/$
      {nativeToken.symbol}.png`,
      marketData: marketData,
      sparklineData: processSparklineData(timeSeriesData),
      isNative: true,
    };
  }
}

export class SolanaService {
  static async getSplTokens(walletAddress: string) {
    if (!walletAddress) return [];

    try {
      const connection = new Connection(
        process.env.NEXT_PUBLIC_QUICKNODE_SOLANA_URL!,
        "confirmed"
      );
      // const connection = new Connection(clusterApiUrl('devnet'));
      const publicKey = new PublicKey(walletAddress);

      // Validate the public key
      if (!publicKey) {
        console.error("Invalid wallet address:", walletAddress);
        return [];
      }

      const [balance, tokenAccounts] = await Promise.all([
        connection.getBalance(publicKey),
        connection.getParsedTokenAccountsByOwner(publicKey, {
          programId: new PublicKey(
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          ),
        }),
      ]);

      // Check if tokenAccounts is in the expected format
      if (!Array.isArray(tokenAccounts.value)) {
        console.error("Unexpected token accounts format:", tokenAccounts);
        return [];
      }

      let solToken;
      if (balance > 0) {
        const nativeToken = await this.getNativeSolToken();
        solToken = {
          ...nativeToken,
          balance: (balance / Math.pow(10, 9)).toString(),
          address: "",
        };
      }

      const tokenData = await this.getTokenAccountsData(tokenAccounts.value);

      const validTokenData = tokenData.filter((token) => token !== null);

      let tokens = [...validTokenData];

      const swopTokenBalance = await this.getSwopTokenBalance(walletAddress);

      if (swopTokenBalance) {
        const swopTokenPrice = await this.fetchTokenPrice(
          SWOP_TOKEN.address || ""
        );

        const swopTokenMarketData = {
          ...SWOP_TOKEN.marketData,
          price: swopTokenPrice,
        };

        tokens = [
          {
            ...SWOP_TOKEN,
            balance: (
              Number(swopTokenBalance) / Math.pow(10, SWOP_TOKEN.decimals)
            ).toString(),
            address: SWOP_TOKEN.address || "",
            marketData: swopTokenMarketData,
          },
          solToken,
          ...validTokenData,
        ];
      } else {
        tokens = [
          { ...SWOP_TOKEN, balance: "0", address: "" },
          solToken,
          ...validTokenData,
        ];
      }

      return tokens;
    } catch (error) {
      console.error("Error fetching Solana tokens:", error);
      return [];
    }
  }

  private static async getNativeSolToken() {
    try {
      const nativeSol = CHAINS.SOLANA.nativeToken;
      const marketData = await TokenAPIService.getMarketData({
        uuid: nativeSol.uuid,
      });

      if (!marketData) {
        console.error("Failed to fetch SOL market data");
        return null;
      }

      const timeSeriesData = await TokenAPIService.getTimeSeriesData(
        marketData.uuid
      );

      return {
        symbol: nativeSol.symbol,
        name: nativeSol.name,
        decimals: nativeSol.decimals,
        address: null,
        chain: "SOLANA",
        marketData,
        sparklineData: processSparklineData(timeSeriesData),
        isNative: true,
      };
    } catch (error) {
      console.error("Error fetching native SOL token:", error);
      return null;
    }
  }

  private static async getTokenAccountsData(tokenAccounts: TokenAccount[]) {
    try {
      const tokens = tokenAccounts
        .map((token: TokenAccount) => {
          try {
            const { tokenAmount, mint } = token.account.data.parsed.info;
            return {
              decimals: tokenAmount.decimals,
              balance: tokenAmount.uiAmountString,
              address: mint,
            };
          } catch (error) {
            console.error("Error parsing token account:", error);
            return null;
          }
        })
        .filter(Boolean);

      const tokenDataPromises = tokens.map(async (token) => {
        if (!token) return null;

        try {
          const marketData = await TokenAPIService.getMarketData({
            address: token.address,
          });

          if (!marketData) {
            console.error(
              `No market data found for
              token: ${token.address}`
            );
            return null;
          }

          const timeSeriesData = await TokenAPIService.getTimeSeriesData(
            marketData.uuid
          );

          return {
            ...token,
            chain: "SOLANA",
            name: marketData.name,
            symbol: marketData.symbol,
            marketData,
            sparklineData: processSparklineData(timeSeriesData),
            isNative: false,
          };
        } catch (error) {
          console.error(
            `Error fetching token data for $
            {token.address}:`,
            error
          );
          return null;
        }
      });

      const results = await Promise.all(tokenDataPromises);
      return results.filter(Boolean);
    } catch (error) {
      console.error("Error processing token accounts:", error);
      return [];
    }
  }

  private static async getSwopTokenBalance(walletAddress: string) {
    const connection = new Connection(
      process.env.NEXT_PUBLIC_QUICKNODE_SOLANA_URL!,
      "confirmed"
    );
    const publicKey = new PublicKey(walletAddress);
    const swopToken = new PublicKey(SWOP_TOKEN.address || "");

    try {
      const associatedTokenAddress = await getAssociatedTokenAddress(
        swopToken,
        publicKey
      );

      // Check if the associated token address is valid
      if (!associatedTokenAddress) {
        console.error("Associated token address not found for SWOP token");
        return null;
      }

      const tokenAccount = await getAccount(connection, associatedTokenAddress);

      // Check if the token account is valid
      if (!tokenAccount) {
        console.error(
          "Token account not found for associated address:",
          associatedTokenAddress.toString()
        );
        return null;
      }

      return tokenAccount.amount;
    } catch (error) {
      console.error("Error fetching SWOP token balance:", error);
      return null;
    }
  }

  private static async fetchTokenPrice(mint: string) {
    return fetchPrice(new PublicKey(mint));
  }
}

// Utility function
export const processSparklineData = (timeSeriesData: {
  change: string;
  history: TimeSeriesDataPoint[];
}) => {
  if (!timeSeriesData?.history) return [];

  return timeSeriesData.history
    .map((data: TimeSeriesDataPoint) => {
      const price = data.price !== null ? parseFloat(data.price) : null;
      return price !== null
        ? { timestamp: data.timestamp, value: price }
        : null;
    })
    .filter(Boolean);
};
