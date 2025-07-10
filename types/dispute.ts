export interface Pagination {
  totalPages: number;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

interface BaseApiResponse {
  success: boolean;
  message?: string;
}

interface ApiSuccessResponse<T> extends BaseApiResponse {
  success: true;
  data: T;
  pagination: Pagination;
  message?: never;
}

interface ApiErrorResponse extends BaseApiResponse {
  success: false;
  message: string;
  data?: never;
  pagination?: never;
}

// ==================== DISPUTE TYPES ====================
export interface Document {
  id?: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedAt?: string;
  downloadUrl?: string;
  cloudinaryUrl?: string;
  fieldName?: string;
}

export interface SellerChallenge {
  response: string;
  category: string;
  evidenceDescription: string;
  requestedAction: string;
  additionalNotes: string | null;
  status: string;
  submittedAt: string;
  documents: Document[];
}

interface Resolution {
  refundTransaction: {
    status: string;
  };
  payoutTransaction: {
    status: string;
    processedAt?: string;
  };
  winner: 'seller' | 'buyer';
  resolutionType: 'seller_payout' | 'buyer_refund';
  refundAmount: number;
  payoutAmount: number;
  resolvedAt: string;
  resolvedBy: string;
}

export interface Dispute {
  id: string;
  reason: string;
  category: string;
  description: string;
  status:
    | 'pending'
    | 'resolved'
    | 'rejected'
    | 'in_review'
    | 'challenged';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  response: string | null;
  responseDate: string | null;
  documents: Document[];
  sellerChallenge: SellerChallenge | null;
  resolution?: Resolution;
}

// ==================== ORDER RELATED TYPES ====================
interface Status {
  delivery: string;
  payment: 'completed' | 'pending' | 'failed';
  isDead: boolean;
}

export interface Financial {
  subtotal: number;
  totalCost: number;
  discountRate: number;
  shippingCost: number;
}

interface ProcessingStage {
  stage: string;
  timestamp: string;
  status: string;
  details?: {
    error?: string;
    trackingNumber?: string;
    shippingProvider?: string;
    estimatedDeliveryDate?: string;
    additionalNotes?: string;
    updatedBy?: string;
    autoCompleted?: boolean;
    reason?: string;
  };
}

interface TxResult {
  hash: string;
  status: string;
  tokenName: string;
  tokenSymbol: string;
  tokenIcon: string;
  tokenAddress: string;
  transferAmount: number;
  tokenAmount: string;
  tokenDecimals: number;
  error: string | null;
}

interface SwapTransaction {
  txHash: string | null;
  status: string;
  fromToken: string | null;
  toToken: string | null;
  inputAmount: number;
  outputAmount: number;
  error: string | null;
}

interface UsdcTransfer {
  txHash: string | null;
  status: string;
  amount: number;
  recipientAddress: string;
  error: string | null;
}

interface EscrowTransfer {
  txHash: string;
  status: string;
  amount: number;
  recipientAddress: string;
  error: string | null;
}

interface PhygitalDetails {
  releaseConditions: {
    shippingConfirmed: boolean;
    customerReceiptConfirmed: boolean;
  };
  fundReleased: {
    timestamp: string;
  };
  disputesProcessingStages: unknown[];
}

interface NFTTemplate {
  name: string;
  image: string;
  price: number;
  description: string;
  nftType: string;
  collectionMintAddress: string;
}

interface MintResult {
  txHash: string;
  mintAddress: string;
  status: string;
  error: string | null;
}

interface MintedNFT {
  nftTemplateId: string;
  collectionId: string;
  quantity: number;
  mintResult: MintResult;
  template: NFTTemplate;
}

export interface Order {
  id: string;
  orderId: string;
  orderType: string;
  paymentMethod: string;
  status: Status;
  financial: Financial;
  orderDate: string;
  ageInDays: number;
  isProcessing: boolean;
  lastProcessingError: Record<string, unknown>;
  txResult: TxResult;
  swapTransaction: SwapTransaction;
  usdcTransfer: UsdcTransfer;
  escrowTransfer: EscrowTransfer;
  processingStages: ProcessingStage[];
  phygitalDetails: PhygitalDetails;
  mintedNfts: MintedNFT[];
  guest: Record<string, unknown>;
}

// ==================== PAYMENT & PARTY TYPES ====================
interface Wallet {
  ens: string;
  address: string;
}

interface Address {
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Party {
  id: string;
  name: string;
  email: string;
  phone: string;
  wallet: Wallet;
  address?: Address;
}

export interface StripePayment {
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
  receiptUrl: string;
  refunded: boolean;
  refundAmount: number;
}

// ==================== RESPONSE TYPES ====================
export interface DisputeListItem extends Dispute {
  disputeDetails: {
    category: string;
    reason: string;
    description: string;
    status: string;
    priority: string;
  };
  order: Order;
  dates: { createdAt: string };
}

export interface DisputeListResponse {
  disputes: DisputeListItem[];
  pagination: Pagination;
}

export interface DisputeDetailsResponse {
  dispute: Dispute;
  order: Order;
  parties: {
    buyer: Party;
    seller: Party;
    guestEmail: string | null;
  };
  stripePayment: StripePayment | null;
}

// ==================== API RESPONSE TYPES ====================
export type GetDisputesListResponse =
  | ApiSuccessResponse<DisputeListResponse>
  | ApiErrorResponse;

export type GetDisputeDetailsResponse =
  | { success: true; data: DisputeDetailsResponse }
  | { success: false; message: string };
