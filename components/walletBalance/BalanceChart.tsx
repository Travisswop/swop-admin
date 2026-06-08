"use client";
import { getWalletChart } from "@/action/walletBalance";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Range = "daily" | "weekly" | "monthly" | "yearly";

interface Props {
  token: string;
}

interface Point {
  label: string;
  timestamp: string;
  amount: number;
}

export default function BalanceChart({ token }: Props) {
  const [userId, setUserId] = useState("");
  const [range, setRange] = useState<Range>("daily");
  const [series, setSeries] = useState<Point[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [meta, setMeta] = useState<{ count: number; warning?: string } | null>(
    null
  );

  const ranges: Range[] = ["daily", "weekly", "monthly", "yearly"];

  const load = async (r: Range = range) => {
    if (!userId.trim()) {
      setError("Enter a user ID first.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await getWalletChart(token, userId.trim(), r);
      if (res?.success && res.data) {
        setSeries(res.data.series ?? []);
        setMeta({ count: res.data.count, warning: res.data.warning });
      } else {
        setError("No data returned.");
        setSeries([]);
      }
    } catch {
      setError("Failed to load chart.");
    } finally {
      setLoading(false);
    }
  };

  const handleRange = (r: Range) => {
    setRange(r);
    load(r);
  };

  return (
    <div className="bg-white rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Balance History Chart
      </h2>

      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ObjectId..."
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none w-72"
        />
        <div className="flex gap-1">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => handleRange(r)}
              className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                range === r
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <button
          onClick={() => load()}
          disabled={loading}
          className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {loading ? "Loading…" : "Load"}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      {meta && (
        <p className="text-gray-400 text-xs mb-3">
          {meta.count} data points
          {meta.warning && ` • ${meta.warning}`}
        </p>
      )}

      {series.length > 0 ? (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart
            data={series}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#000" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#000" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${Number(v).toFixed(0)}`}
            />
            <Tooltip
              formatter={(v: number) => [`$${v.toFixed(2)}`, "Balance"]}
              labelFormatter={(l) => `Period: ${l}`}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#000"
              strokeWidth={2}
              fill="url(#balGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#000" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        !loading && (
          <div className="h-[280px] flex items-center justify-center text-gray-400 text-sm">
            Enter a user ID and click Load to see the balance chart.
          </div>
        )
      )}

      {loading && (
        <div className="h-[280px] flex items-center justify-center text-gray-400 text-sm">
          Loading chart data…
        </div>
      )}
    </div>
  );
}
