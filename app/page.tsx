import DownloadsByCountryMap from "@/components/homepageChart/CountryDownloadCountChart";
import FreeVsPremiumChart from "@/components/homepageChart/FreevsPremiumCustomner";
import SubsidyWalletChart from "@/components/homepageChart/SubsidyChart";
import SwopIDGrowthChart from "@/components/homepageChart/SwopIdGrowth";
import UserGrowthWithDropdown from "@/components/homepageChart/UserGrowth";

export default function Home() {
  return (
    <section className="w-full h-full text-black">
      <p>main page here</p>
      <UserGrowthWithDropdown />
      <FreeVsPremiumChart />
      <SubsidyWalletChart />
      <DownloadsByCountryMap />
      <SwopIDGrowthChart />
    </section>
  );
}
