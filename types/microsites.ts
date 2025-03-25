import { ObjectId } from "mongoose"; // Ensure this is installed and imported correctly

export type Microsite = {
  _id: string; // ObjectId in string format
  parentId: {
    referralLink: string;
    name: string;
    bio: string;
  }; // Reference to User model
  name: string;
  bio: string;
  brandImg: string;
  username: string;
  profilePic: string;
  backgroundImg: string;
  backgroundColor: string;
  fontColor: string;
  secondaryFontColor: string;
  fontFamily: string;
  themeColor: string;
  profileUrl: string;
  qrcodeUrl: string | null;
  qrCode: ObjectId | null; // Reference to MicrositeQRCode
  pkPassUrl: string;
  direct: Record<string, any> | null;
  totalTap: number;
  connection: ObjectId | null; // Reference to Connection model
  gatedAccess: boolean;
  gatedInfo: {
    contractAddress: string;
    eventLink: string;
    network: string;
    tokenId: string;
  };
  nfcSerialNo: string;
  info: {
    socialTop: ObjectId[]; // References to SocialSmall model
    videoUrl: ObjectId[]; // References to EmbedVideo model
    socialLarge: ObjectId[]; // References to SocialLarge model
    product: ObjectId[]; // References to Product model
    infoBar: ObjectId[]; // References to InfoBar model
    contact: ObjectId[]; // References to Contact model
    ensDomain: ObjectId[]; // References to EnsDomain model
    blog: ObjectId[]; // References to Blog model
    audio: ObjectId[]; // References to Audio model
    video: ObjectId[]; // References to Video model
    redeemLink: ObjectId[]; // References to RedeemLink model
    referral: ObjectId[]; // References to Referral model
    marketPlace: ObjectId[]; // References to MarketPlace model
  };
  theme: boolean;
  ens: string;
  ethAddress: string;
  ensData: Record<string, any> | null;
  primary: boolean;
  leadCapture: boolean;
  web3enabled: boolean;
  showFeed: boolean;
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
  __v: number; // Version key
};
