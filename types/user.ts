export interface IUser {
  _id?: string;
  name: string;
  email: string;
  profilePic?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserDataResponse {
  success: boolean;
  data: User[];
}

export interface User {
  paymentInfo: PaymentInfo;
  _id: string;
  name: string;
  email: string;
  password: string;
  countryCode: string;
  countryFlag: string;
  mobileNo: string;
  address: string;
  primaryWalletEns: string;
  apt: string;
  bio: string;
  dob: number;
  profilePic: string;
  referralCode: string;
  referralLink: string;
  socialSignup: boolean;
  isPremiumUser: boolean;
  rewardAmount: number;
  primaryMicrosite: string;
  microsites: Microsite[];
  subscriber: unknown[]; // If subscriber has a structure, replace `any[]` with that type
  tap: unknown[]; // Same as above
  notificationToken: string;
  correlationId: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  walletData: IWallet | null; // Define specific type if walletData has a structure
}

export interface IWallet {
  wallet: {
    ethAddress: string;
    solAddress: string;
  };
}
export interface PaymentInfo {
  subscribe: Subscription;
  referral: unknown[]; // Define specific type if referral data has a structure
}

export interface Subscription {
  subscriptionStartDate: string | null;
  subscriptionEndDate: string | null;
  transactionData: unknown[]; // Define specific type if transactionData has a structure
}

export interface Microsite {
  backgroundColor: string;
  fontColor: string;
  secondaryFontColor: string;
  fontFamily: string;
  themeColor: string;
  _id: string;
  name: string;
  bio: string;
  username: string;
  profilePic: string;
  backgroundImg: string;
  profileUrl: string;
  theme: boolean;
  ens: string;
  ethAddress: string;
  primary: boolean;
}

export interface SearchParams {
  page?: string;
  limit?: string;
  [key: string]: string | string[] | undefined;
}
