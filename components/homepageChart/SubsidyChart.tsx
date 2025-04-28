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

  const balance = data?.[0]?.balance ?? 0;
  const formattedBalance = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(balance);

  console.log("check data info", loading, error);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm flex-[2] xl:flex-[1.5] 2xl:flex-1">
      <h2 className="text-lg font-bold mb-4">Subsidy Wallet</h2>
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
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
            <Image
              src="https://cryptologos.cc/logos/polygon-matic-logo.png"
              alt="Polygon"
              className="w-4 h-4"
              width={60}
              height={60}
            />
          </div>
          <div className="ml-3">
            <p className="font-medium">Polygon</p>
            <p className="text-xs text-gray-500">Polygon</p>
          </div>
          <p className="ml-auto font-semibold text-purple-500">$ 7000.00</p>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <Image
              src="/images/swop-logo.png"
              alt="Swopple"
              className="w-5 h-auto"
              width={150}
              height={150}
            />
          </div>
          <div className="ml-3">
            <p className="font-medium">Swopple</p>
            <p className="text-xs text-gray-500">Swopple</p>
          </div>
          <p className="ml-auto font-semibold">$ {formattedBalance}</p>
        </div>
      </div>
    </div>
  );
};

export default SubsidyWalletChart;
