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
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: string;
  downloadUrl: string;
}

export interface Dispute {
  id: string;
  reason: string;
  category: string;
  description: string;
  status: "pending" | "resolved" | "rejected" | "in_review"; // enum if possible
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
  response: string | null;
  responseDate: string | null;
  documents: Document[];
  sellerChallenge: unknown | null;
}

// ==================== ORDER RELATED TYPES ====================
interface Status {
  delivery: string;
  payment: "completed" | "pending" | "failed";
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
}

interface NFTTemplate {
  name: string;
  image: string;
  price: number;
  description: string;
  nftType: string;
  collectionMintAddress: string;
}

interface MintedNFT {
  nftTemplateId: string;
  collectionId: string;
  quantity: number;
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
  processingStages: ProcessingStage[];
  mintedNfts: MintedNFT[];
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
  address: Address;
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
export interface DisputeListItem
  extends Pick<
    Dispute,
    "id" | "reason" | "category" | "status" | "priority" | "createdAt"
  > {}

export interface DisputeListResponse {
  data: DisputeListItem[];
  pagination: Pagination;
}

export interface DisputeDetailsResponse {
  id: string;
  orderId: string;
  createdAt: string;
  category: string;
  reason: string;
  description: string;
  status: string;
  dispute: Dispute;
  order: Order;
  parties: {
    buyer: Party;
    seller: Party;
    guestEmail: string | null;
  };
  stripePayment: StripePayment;
}

// ==================== API RESPONSE TYPES ====================
export type GetDisputesListResponse =
  | ApiSuccessResponse<DisputeListResponse>
  | ApiErrorResponse;

export type GetDisputeDetailsResponse =
  | { success: true; data: DisputeDetailsResponse }
  | { success: false; message: string };
