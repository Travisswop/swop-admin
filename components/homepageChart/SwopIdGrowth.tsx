"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data for the chart
const data = [
  { name: "Jan", swopIds: 200, transactions: 400 },
  { name: "Feb", swopIds: 300, transactions: 200 },
  { name: "Mar", swopIds: 500, transactions: 600 },
  { name: "Apr", swopIds: 700, transactions: 500 },
  { name: "May", swopIds: 600, transactions: 400 },
  { name: "Jun", swopIds: 900, transactions: 700 },
  { name: "Jul", swopIds: 1000, transactions: 800 },
];

const SwopIDGrowthChart: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg mx-auto">
      <h2 className="text-lg font-bold mb-4">Swop.ID Growth</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: 20 }}
            formatter={(value, entry) => {
              const styles =
                entry.color === "#34A853"
                  ? { color: "#34A853", fontWeight: "bold" }
                  : { color: "#4285F4", fontWeight: "bold" };
              return <span style={styles}>{value}</span>;
            }}
          />
          <Line
            type="monotone"
            dataKey="swopIds"
            stroke="#34A853"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="swop.ids"
          />
          <Line
            type="monotone"
            dataKey="transactions"
            stroke="#4285F4"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Transactions"
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          <div
            className="w-4 h-4 rounded-full bg-green-600 mr-2"
            style={{ backgroundColor: "#34A853" }}
          />
          <div>
            <p className="text-sm font-bold">swop.ids</p>
            <p className="text-xs text-gray-500">Global</p>
          </div>
        </div>
        <div className="text-green-600 text-lg font-bold">800</div>
      </div>
      <div className="mt-2 flex justify-between items-center">
        <div className="flex items-center">
          <div
            className="w-4 h-4 rounded-full bg-blue-600 mr-2"
            style={{ backgroundColor: "#4285F4" }}
          />
          <div>
            <p className="text-sm font-bold">Transactions</p>
            <p className="text-xs text-gray-500">Commercial</p>
          </div>
        </div>
        <div className="text-blue-600 text-lg font-bold">600</div>
      </div>
    </div>
  );
};

export default SwopIDGrowthChart;
