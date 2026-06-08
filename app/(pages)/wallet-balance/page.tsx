import { cookies } from "next/headers";
import WalletBalanceDashboard from "@/components/walletBalance/WalletBalanceDashboard";

const WalletBalancePage = async () => {
  const token = (await cookies()).get("authToken")?.value ?? "";
  return <WalletBalanceDashboard token={token} />;
};

export default WalletBalancePage;
