"use client";
import React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", lastMonth: 8000, thisMonth: 10000 },
  { month: "Feb", lastMonth: 8500, thisMonth: 11000 },
  { month: "Mar", lastMonth: 9000, thisMonth: 12000 },
  { month: "Apr", lastMonth: 9500, thisMonth: 14000 },
  { month: "May", lastMonth: 10000, thisMonth: 16000 },
  { month: "Jun", lastMonth: 10500, thisMonth: 18000 },
  { month: "Jul", lastMonth: 11000, thisMonth: 20000 },
];

const FreeVsPremiumChart = () => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 flex-[2]"
      // style={{
      //   maxWidth: "600px",
      //   margin: "auto",
      //   fontFamily: "Arial, sans-serif",
      // }}
    >
      {/* Title */}
      <h3
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          textAlign: "left",
          marginBottom: "20px",
        }}
      >
        Free Vs Premium Customrs
      </h3>

      {/* Chart */}
      <div style={{ width: "100%", height: "300px" }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            {/* Gradient Definitions */}
            <defs>
              <linearGradient
                id="lastMonthGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#00BFFF" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#00BFFF" stopOpacity={0} />
              </linearGradient>
              <linearGradient
                id="thisMonthGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#32CD32" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#32CD32" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Chart Layout */}
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9f9f9",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
            <Legend
              verticalAlign="bottom"
              iconType="line"
              wrapperStyle={{
                paddingTop: "20px",
                fontSize: "12px",
                color: "#555",
              }}
            />

            {/* Areas */}
            <Area
              type="monotone"
              dataKey="lastMonth"
              stroke="#00BFFF"
              fill="url(#lastMonthGradient)"
              strokeWidth={2}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="thisMonth"
              stroke="#32CD32"
              fill="url(#thisMonthGradient)"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
          borderTop: "1px solid #f0f0f0",
          paddingTop: "20px",
        }}
      >
        {/* Left Column */}
        <div style={{ textAlign: "center" }}>
          <h4
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#555",
            }}
          >
            Total Users:
          </h4>
          <p style={{ fontSize: "12px", margin: "5px 0" }}>
            Last Month: <strong>1100</strong>
          </p>
          <p style={{ fontSize: "12px", margin: "5px 0" }}>
            This Month: <strong>2100</strong>
          </p>
        </div>

        {/* Right Column */}
        <div style={{ textAlign: "center" }}>
          <h4
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#555",
            }}
          >
            Total Subscribers:
          </h4>
          <p style={{ fontSize: "12px", margin: "5px 0" }}>
            Last Month: <strong>10600</strong>
          </p>
          <p style={{ fontSize: "12px", margin: "5px 0" }}>
            This Month: <strong>900</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FreeVsPremiumChart;
