export type Customer = {
  name: string;
  email: string;
  phone: string;
  shippingAddress: string;
  walletAddress: string;
  [key: string]: any; // In case there are additional fields
};

export type Financial = {
  subtotal: number;
  discountRate: number;
  shippingCost: number;
  totalCost: number;
};

export type MintedNft = {
  [key: string]: any; // Define exact fields if known
};

export type ReleaseConditions = {
  [key: string]: any; // Define exact fields if known
};

export type FundReleased = {
  [key: string]: any; // Define exact fields if known
};

export type PhygitalDetails = {
  releaseConditions: ReleaseConditions;
  fundReleased: FundReleased;
  disputesProcessingStages: any[];
};

export type ProcessingStage = {
  [key: string]: any; // Define exact fields if known
};

export type Status = {
  delivery: string;
  isDead: boolean;
};

export type SwapTransaction = {
  txHash: string | null;
  status: string;
  fromToken: string | null;
  toToken: string | null;
  inputAmount: number;
  [key: string]: any; // For extra fields
};

export type TxResult = {
  hash: string;
  status: string;
  tokenName: string;
  tokenSymbol: string;
  tokenIcon: string;
  [key: string]: any; // For extra fields
};

export type Order = {
  _id: string;
  buyerId: string;
  sellerId: string;
  orderId: string;
  orderType: string;
  orderDate: string;
  createdAt: string;
  updatedAt: string;
  customer: Customer;
  financial: Financial;
  mintedNfts: MintedNft[];
  phygitalDetails: PhygitalDetails;
  processingStages: ProcessingStage[];
  status: Status;
  swapTransaction: SwapTransaction;
  txResult: TxResult;
  __v: number;
};
