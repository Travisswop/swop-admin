"use client";
import Image from "next/image";
import React from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

//sample data
const data = [
  { month: "Jan", polygon: 7000, swopple: 4020 },
  { month: "Feb", polygon: 5000, swopple: 3200 },
  { month: "Mar", polygon: 6000, swopple: 3600 },
  { month: "Apr", polygon: 8000, swopple: 4600 },
  { month: "May", polygon: 10000, swopple: 5800 },
  { month: "Jun", polygon: 9000, swopple: 5200 },
  { month: "Jul", polygon: 7000, swopple: 4020 },
];

const SubsidyWalletChart: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm">
      <h2 className="text-lg font-bold mb-4">Subsidy Wallet</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
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
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <Image
              src="https://via.placeholder.com/16/000000/FFFFFF/?text=S"
              alt="Swopple"
              className="w-4 h-4"
              width={60}
              height={60}
            />
          </div>
          <div className="ml-3">
            <p className="font-medium">Swopple</p>
            <p className="text-xs text-gray-500">Swopple</p>
          </div>
          <p className="ml-auto font-semibold">$ 4020.22</p>
        </div>
      </div>
    </div>
  );
};

export default SubsidyWalletChart;
