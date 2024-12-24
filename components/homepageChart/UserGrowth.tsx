"use client";
import React, { ChangeEvent, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", iOS: 200, Android: 300, SwopPay: 400 },
  { month: "Feb", iOS: 250, Android: 280, SwopPay: 380 },
  { month: "Mar", iOS: 300, Android: 400, SwopPay: 350 },
  { month: "Apr", iOS: 350, Android: 380, SwopPay: 360 },
  { month: "May", iOS: 370, Android: 420, SwopPay: 390 },
  { month: "Jun", iOS: 400, Android: 410, SwopPay: 370 },
  { month: "Jul", iOS: 420, Android: 430, SwopPay: 400 },
  { month: "Aug", iOS: 390, Android: 400, SwopPay: 380 },
  { month: "Sep", iOS: 350, Android: 390, SwopPay: 340 },
  { month: "Oct", iOS: 300, Android: 370, SwopPay: 320 },
  { month: "Nov", iOS: 280, Android: 340, SwopPay: 300 },
  { month: "Dec", iOS: 260, Android: 310, SwopPay: 290 },
];

const UserGrowth = () => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      {/* <h3>User Growth</h3> */}
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="iOS"
            stroke="#8A2BE2"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="Android"
            stroke="#FF4500"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="SwopPay"
            stroke="#32CD32"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const UserGrowthWithDropdown = () => {
  const [filter, setFilter] = useState("Monthly");

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
    // Update data based on filter if needed
  };

  return (
    <div className="bg-white p-4 pl-0 rounded-xl">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>User Growth</h3>
        <select value={filter} onChange={handleFilterChange}>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      <UserGrowth />
    </div>
  );
};

export default UserGrowthWithDropdown;
