"use client";
import { getAllWallets } from "@/action/walletBalance";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

interface WalletRow {
  userId: string;
  ethAddress: string | null;
  solAddress: string | null;
  balance: string;
  breakdown: { evm: number; solana: number; swop: number };
  lastUpdateAt: string;
  activityLevel: string;
  updateFrequency: string;
  totalUpdates: number;
  failedUpdates: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface Props {
  token: string;
}

const ACTIVITY_COLORS: Record<string, string> = {
  high: "bg-green-100 text-green-700",
  medium: "bg-blue-100 text-blue-700",
  low: "bg-yellow-100 text-yellow-700",
  inactive: "bg-gray-100 text-gray-500",
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function WalletsTable({ token }: Props) {
  const [rows, setRows] = useState<WalletRow[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasBalance, setHasBalance] = useState<"" | "true" | "false">("");
  const [needsUpdate, setNeedsUpdate] = useState<"" | "true" | "false">("");
  const [search, setSearch] = useState("");

  const fetchWallets = async (p: number = page) => {
    setLoading(true);
    try {
      const res = await getAllWallets(
        token,
        p,
        20,
        hasBalance || undefined,
        needsUpdate || undefined
      );
      if (res?.success && res.data) {
        setRows(res.data.wallets ?? []);
        setPagination(res.data.pagination ?? null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets(1);
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasBalance, needsUpdate]);

  const handlePage = (p: number) => {
    if (!pagination) return;
    if (p < 1 || p > pagination.pages) return;
    setPage(p);
    fetchWallets(p);
  };

  const filtered = search
    ? rows.filter(
        (r) =>
          r.userId.toLowerCase().includes(search.toLowerCase()) ||
          r.ethAddress?.toLowerCase().includes(search.toLowerCase()) ||
          r.solAddress?.toLowerCase().includes(search.toLowerCase())
      )
    : rows;

  const pageNumbers = () => {
    if (!pagination) return [];
    const start = Math.max(1, page - 1);
    const end = Math.min(pagination.pages, page + 1);
    const nums: number[] = [];
    for (let i = start; i <= end; i++) nums.push(i);
    return nums;
  };

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">All Wallets</h2>
          {pagination && (
            <p className="text-sm text-gray-400 mt-0.5">
              {pagination.total} wallets total
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by user / address…"
              className="border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-700 focus:outline-none w-60"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          </div>

          {/* Has balance filter */}
          <select
            value={hasBalance}
            onChange={(e) =>
              setHasBalance(e.target.value as "" | "true" | "false")
            }
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none"
          >
            <option value="">All balances</option>
            <option value="true">Has balance</option>
            <option value="false">Zero balance</option>
          </select>

          {/* Needs update filter */}
          <select
            value={needsUpdate}
            onChange={(e) =>
              setNeedsUpdate(e.target.value as "" | "true" | "false")
            }
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none"
          >
            <option value="">Any update status</option>
            <option value="true">Needs update</option>
          </select>

          <button
            onClick={() => fetchWallets(page)}
            className="px-3 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
              <th className="px-4 py-3 text-left font-medium">Wallet</th>
              <th className="px-4 py-3 text-right font-medium">Balance</th>
              <th className="px-4 py-3 text-right font-medium">EVM</th>
              <th className="px-4 py-3 text-right font-medium">Solana</th>
              <th className="px-4 py-3 text-center font-medium">Activity</th>
              <th className="px-4 py-3 text-center font-medium">Frequency</th>
              <th className="px-4 py-3 text-center font-medium">Updates</th>
              <th className="px-4 py-3 text-right font-medium">Last Update</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center py-16 text-gray-400">
                  Loading…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-16 text-gray-400">
                  No wallets found.
                </td>
              </tr>
            ) : (
              filtered.map((w, i) => (
                <tr
                  key={w.userId + i}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <p className="text-gray-500 text-xs font-mono">
                      {w.userId.slice(0, 10)}…
                    </p>
                    {w.ethAddress && (
                      <p className="text-gray-400 text-xs font-mono mt-0.5">
                        ETH {w.ethAddress}
                      </p>
                    )}
                    {w.solAddress && (
                      <p className="text-gray-400 text-xs font-mono mt-0.5">
                        SOL {w.solAddress}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-800">
                    ${w.balance}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-500">
                    ${(w.breakdown?.evm ?? 0).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-500">
                    ${(w.breakdown?.solana ?? 0).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                        ACTIVITY_COLORS[w.activityLevel] ??
                        "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {w.activityLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-gray-500 capitalize">
                    {w.updateFrequency}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-gray-700">{w.totalUpdates}</span>
                    {w.failedUpdates > 0 && (
                      <span className="text-red-400 ml-1 text-xs">
                        ({w.failedUpdates} failed)
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-400 text-xs">
                    {w.lastUpdateAt ? timeAgo(w.lastUpdateAt) : "Never"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <nav className="flex justify-end mt-5">
          <ul className="inline-flex -space-x-px text-sm items-center">
            <li>
              <button
                onClick={() => handlePage(page - 1)}
                disabled={page <= 1}
                className="px-3 py-2 bg-white border rounded-l-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40"
              >
                Previous
              </button>
            </li>
            {page > 2 && (
              <li className="px-3 py-2 border text-gray-400">
                <BsThreeDots />
              </li>
            )}
            {pageNumbers().map((n) => (
              <li key={n}>
                <button
                  onClick={() => handlePage(n)}
                  className={`px-4 py-2 border ${
                    n === page
                      ? "bg-black text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {n}
                </button>
              </li>
            ))}
            {page + 1 < pagination.pages && (
              <li className="px-3 py-2 border text-gray-400">
                <BsThreeDots />
              </li>
            )}
            <li>
              <button
                onClick={() => handlePage(page + 1)}
                disabled={page >= pagination.pages}
                className="px-3 py-2 bg-white border rounded-r-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
