interface PaymentInfo {
  subscribe: {
    subscriptionStartDate: string | null;
    subscriptionEndDate: string | null;
    transactionData: []; // Replace `any` with a more specific type if possible
  };
  referral: []; // Replace `any` with a more specific type if possible
}

export interface UserId {
  paymentInfo: PaymentInfo;
  _id: string;
  name: string;
  email: string;
  password: string;
  countryCode: string;
  countryFlag: string;
  mobileNo: string;
  address: string;
  country?: string;
  apt: string;
  bio: string;
  dob: number;
  profilePic: string;
  referralCode: string;
  referralLink: string;
  socialSignup: boolean;
  isPremiumUser: boolean;
  rewardAmount: number;
  primaryMicrositeEns?: string;
  primaryMicrosite: string;
  microsites: string[];
  subscriber: []; // Replace `any` with a more specific type if possible
  tap: Array<{
    type: string;
    id: string;
    timestamp: number;
  }>;
  notificationToken: string;
  correlationId: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  ethereumWallet: string;
  privyId: string;
  solanaWallet: string;
}

interface Activity {
  campaiginId: string;
  pointType: string;
  pointValue: number;
  minPoints: number;
  maxPoints: number;
  _id: string;
}

export interface DataItem {
  _id: string;
  userId: UserId;
  availablePoints: number;
  totalEarnedPoints: number;
  withdrawPoints: number;
  activity: Activity[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface ApiResponse {
  success: boolean;
  data: DataItem[];
  pagination: Pagination;
}

// types.ts

// Define the interface for the PointsList subdocument
export interface PointsList {
  _id: string;
  title: string;
  pointValue: number;
  minPoints: number;
  maxPoints: number | null; // null means no limit
  isActive: boolean;
}

// Define the interface for the Campaign document
export interface Campaign {
  _id?: string; // Optional because it's generated by MongoDB
  title: string;
  actionKey: string;
  isActive: boolean;
  startDate: Date | null;
  endDate: Date | null;
  maxAllocatePoints: number | null;
  totalClaimPoints: number | null;
  pointsList: PointsList[];
  createdAt?: Date; // Optional because it's generated by Mongoose
  updatedAt?: Date; // Optional because it's generated by Mongoose
}
