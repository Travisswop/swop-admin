"use client";
import { useSolanaWallet } from "@/Hook/useSolanaWallet";
import Image from "next/image";
import React from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

//sample data
const chartData = [
  { month: "Jan", polygon: 7000, swopple: 4020 },
  { month: "Feb", polygon: 5000, swopple: 3200 },
  { month: "Mar", polygon: 6000, swopple: 3600 },
  { month: "Apr", polygon: 8000, swopple: 4600 },
  { month: "May", polygon: 10000, swopple: 5800 },
  { month: "Jun", polygon: 9000, swopple: 5200 },
  { month: "Jul", polygon: 7000, swopple: 4020 },
];

const SubsidyWalletChart: React.FC = () => {
  const { data, loading, error } = useSolanaWallet(
    "HPmEbq6VMzE8dqRuFjLrNNxmqzjvP72jCofoFap5vBR2"
  );

  // if (loading) return <p>Loading wallet data...</p>;
  // if (error) return <p>{error}</p>;

  // const balance = data?.[0]?.balance ?? 0;
  // const formattedBalance = new Intl.NumberFormat("en-US", {
  //   minimumFractionDigits: 2,
  //   maximumFractionDigits: 2,
  // }).format(balance);

  console.log("check wallet data info", data, loading, error);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm flex-[2] xl:flex-[1.5] 2xl:flex-1">
      <h2 className="text-lg font-bold mb-4">Subsidy Wallet</h2>
      {loading ? (
        <div className="">
          <div role="status" className="max-w-sm animate-pulse">
            <div className="flex items-center justify-center w-full h-36 bg-gray-300 rounded-sm"></div>
            {[1, 2, 3, 4, 5, 6].map((el, index) => (
              <div
                key={index}
                className="flex items-center justify-between space-x-4 mt-4"
              >
                <div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                <div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#999", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  padding: "10px",
                }}
              />
              <Bar
                dataKey="polygon"
                fill="#a78bfa"
                barSize={20}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="swopple"
                fill="#000"
                barSize={20}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6">
            <div className="p-4 space-y-4 h-[200px] overflow-y-auto">
              {data?.map((token, index) => {
                const icon = token?.marketData?.iconUrl || "";
                const price = parseFloat(token?.marketData?.price || "0");
                const balance = token?.balance;

                const formattedBalance = balance / 10 ** token?.decimals;

                const usdValue = formattedBalance * price;

                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b pb-2"
                  >
                    {icon && (
                      <Image
                        width={24}
                        height={24}
                        src={icon}
                        alt={token.symbol}
                        className="w-6 h-6"
                      />
                    )}
                    <div className="flex-1">
                      <div className="font-semibold text-sm">
                        {token.name} ({token.symbol})
                      </div>
                      <div className="text-xs text-gray-500">
                        Balance: {formattedBalance.toFixed(8)} | Price: $
                        {price.toFixed(4)}
                      </div>
                    </div>
                    <div className="font-medium text-base text-gray-800">
                      {Number(usdValue).toFixed(8)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubsidyWalletChart;
