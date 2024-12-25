import ConnectionLeaderboard from "@/components/homepageChart/ConnectionLeaderBoard";
import DownloadsByCountryMap from "@/components/homepageChart/CountryDownloadCountChart";
import CustomerSupport from "@/components/homepageChart/CustomerSupport";
import FreeVsPremiumChart from "@/components/homepageChart/FreevsPremiumCustomner";
import SalesLeaderboard from "@/components/homepageChart/SalesLeaderBoard";
import SubsidyWalletChart from "@/components/homepageChart/SubsidyChart";
import SwopIDGrowthChart from "@/components/homepageChart/SwopIdGrowth";
import UserGrowthWithDropdown from "@/components/homepageChart/UserGrowth";

export default function Home() {
  return (
    <section className="w-full h-full text-black flex flex-col gap-5">
      <div className="w-full flex gap-5">
        <UserGrowthWithDropdown />
        <FreeVsPremiumChart />
        <SubsidyWalletChart />
      </div>
      <div className="grid grid-cols-3 gap-5">
        <SalesLeaderboard />
        <DownloadsByCountryMap />
        <CustomerSupport />
      </div>
      <div className="grid grid-cols-3 gap-5">
        <DownloadsByCountryMap />
        <SwopIDGrowthChart />
        <ConnectionLeaderboard />
      </div>
    </section>
  );
}
