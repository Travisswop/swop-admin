"use client";
import {
  cleanWalletBalanceQueue,
  emptyWalletBalanceQueue,
  getWalletBalanceDashboard,
  getWalletBalanceHealth,
  pauseWalletBalanceQueue,
  resumeWalletBalanceQueue,
  runSnapshotAggregation,
  triggerWalletBalanceUpdate,
} from "@/action/walletBalance";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { FaDatabase, FaWallet } from "react-icons/fa";
import {
  MdOutlinePause,
  MdOutlinePlayArrow,
  MdQueryStats,
} from "react-icons/md";
import { TbBroom } from "react-icons/tb";
import { toast } from "react-toastify";
import BalanceChart from "./BalanceChart";
import WalletsTable from "./WalletsTable";

// ─── Types ──────────────────────────────────────────────────────────────────

interface QueueData {
  waiting: number;
  active: number;
  completed: number;
  failed: number;
  delayed: number;
  isPaused: boolean;
  recentActive: { id: string; progress: number; timestamp: number }[];
  recentFailed: { id: string; failedReason: string; timestamp: number }[];
}

interface WalletsData {
  total: number;
  withBalance: number;
  withoutBalance: number;
  updatedLastHour: number;
  updatedLast24h: number;
  needingUpdate: number;
}

interface DashboardData {
  timestamp: string;
  queue: QueueData;
  wallets: WalletsData;
  topWallets: {
    userId: string;
    ethAddress: string | null;
    solAddress: string | null;
    balance: string;
    lastUpdate: string;
  }[];
  recentlyUpdated: {
    userId: string;
    balance: string;
    lastUpdate: string;
    totalUpdates: number;
  }[];
  failedUpdates: {
    userId: string;
    error: string;
    errorAt: string;
    failCount: number;
  }[];
}

interface HealthData {
  status: string;
  queue: { isPaused: boolean; waiting: number; active: number; failed: number };
  performance: {
    walletsUpdatedLastHour: number;
    successRate: string;
    totalUpdates: number;
    failedUpdates: number;
  };
  memory: { heapUsed: string; heapTotal: string; rss: string };
  uptime: string;
}

// ─── Small helpers ───────────────────────────────────────────────────────────

function timeAgo(dateStr: string) {
  if (!dateStr) return "—";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">
        {label}
      </p>
      <p
        className={`text-3xl font-bold ${
          accent ? `text-${accent}-600` : "text-gray-900"
        }`}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

function QueueCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div
      className={`rounded-xl p-4 border ${color} flex flex-col items-center text-center`}
    >
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs mt-1 font-medium uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}

function ActionBtn({
  onClick,
  disabled,
  children,
  variant = "default",
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: "default" | "danger" | "warning" | "success";
}) {
  const colors = {
    default:
      "bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500",
    danger:
      "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-200 disabled:text-red-400",
    warning:
      "bg-yellow-400 text-black hover:bg-yellow-500 disabled:bg-yellow-200",
    success: "bg-green-500 text-white hover:bg-green-600 disabled:bg-green-200",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 disabled:cursor-not-allowed ${colors[variant]}`}
    >
      {children}
    </button>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function WalletBalanceDashboard({ token }: { token: string }) {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      const [dashRes, healthRes] = await Promise.all([
        getWalletBalanceDashboard(token),
        getWalletBalanceHealth(token),
      ]);
      if (dashRes?.success !== false) setDashboard(dashRes?.data ?? dashRes);
      if (healthRes?.success !== false) setHealth(healthRes?.data ?? healthRes);
      setLastRefreshed(new Date());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    if (autoRefresh) {
      intervalRef.current = setInterval(fetchAll, 10000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoRefresh, fetchAll]);

  const withAction = async (
    key: string,
    fn: () => Promise<{ success: boolean; message?: string; data?: unknown }>
  ) => {
    setActionLoading(key);
    try {
      const res = await fn();
      if (res?.success) {
        toast.success(res?.message ?? "Done");
        await fetchAll();
      } else {
        toast.error("Action failed");
      }
    } catch {
      toast.error("Request failed");
    } finally {
      setActionLoading(null);
    }
  };

  const isPaused = dashboard?.queue?.isPaused ?? false;
  const queueStatus = isPaused
    ? "Paused"
    : (dashboard?.queue?.active ?? 0) > 0
    ? "Processing"
    : "Idle";

  const statusColor =
    queueStatus === "Paused"
      ? "bg-yellow-100 text-yellow-700"
      : queueStatus === "Processing"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-500";

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
            <FaWallet className="text-white text-base" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Wallet Balance Worker
            </h1>
            <p className="text-sm text-gray-400">
              Monitor and control the balance update pipeline
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {lastRefreshed && (
            <span className="text-xs text-gray-400">
              Refreshed {timeAgo(lastRefreshed.toISOString())}
            </span>
          )}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <span className="text-xs text-gray-500">Auto-refresh</span>
            <div
              onClick={() => setAutoRefresh((p) => !p)}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                autoRefresh ? "bg-black" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  autoRefresh ? "translate-x-5" : ""
                }`}
              />
            </div>
          </label>
          <button
            onClick={fetchAll}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <BiRefresh
              className={`text-base ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* ── Status + Health strip ── */}
      <div className="bg-white rounded-2xl p-4 flex flex-wrap items-center gap-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
            Queue
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
          >
            {queueStatus}
          </span>
        </div>
        {health && (
          <>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <MdQueryStats className="text-gray-400" />
              Success rate{" "}
              <span className="font-semibold text-gray-800">
                {health.performance?.successRate ?? "—"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <FaDatabase className="text-gray-400 text-xs" />
              Memory{" "}
              <span className="font-semibold text-gray-800">
                {health.memory?.heapUsed ?? "—"}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Uptime{" "}
              <span className="font-semibold text-gray-800">
                {health.uptime ?? "—"}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Updated last hour{" "}
              <span className="font-semibold text-gray-800">
                {health.performance?.walletsUpdatedLastHour ?? 0}
              </span>
            </div>
          </>
        )}
      </div>

      {/* ── Top stat cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          label="Total Wallets"
          value={loading ? "—" : (dashboard?.wallets?.total ?? 0)}
        />
        <StatCard
          label="With Balance"
          value={loading ? "—" : (dashboard?.wallets?.withBalance ?? 0)}
          accent="green"
        />
        <StatCard
          label="Updated / Hour"
          value={loading ? "—" : (dashboard?.wallets?.updatedLastHour ?? 0)}
          accent="blue"
        />
        <StatCard
          label="Updated / 24h"
          value={loading ? "—" : (dashboard?.wallets?.updatedLast24h ?? 0)}
        />
        <StatCard
          label="Needing Update"
          value={loading ? "—" : (dashboard?.wallets?.needingUpdate ?? 0)}
          accent="yellow"
        />
        <StatCard
          label="Zero Balance"
          value={loading ? "—" : (dashboard?.wallets?.withoutBalance ?? 0)}
        />
      </div>

      {/* ── Queue panel ── */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-base font-semibold text-gray-800 mb-4">
          Queue Controls
        </h2>

        {/* Queue metric pills */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          <QueueCard
            label="Waiting"
            value={dashboard?.queue?.waiting ?? 0}
            color="border-gray-200 text-gray-700"
          />
          <QueueCard
            label="Active"
            value={dashboard?.queue?.active ?? 0}
            color="border-green-200 bg-green-50 text-green-700"
          />
          <QueueCard
            label="Failed"
            value={dashboard?.queue?.failed ?? 0}
            color={
              (dashboard?.queue?.failed ?? 0) > 0
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-gray-200 text-gray-700"
            }
          />
          <QueueCard
            label="Delayed"
            value={dashboard?.queue?.delayed ?? 0}
            color="border-gray-200 text-gray-700"
          />
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <ActionBtn
            variant="success"
            disabled={!!actionLoading}
            onClick={() =>
              withAction("trigger", () => triggerWalletBalanceUpdate(token))
            }
          >
            <MdOutlinePlayArrow className="text-lg" />
            {actionLoading === "trigger" ? "Triggering…" : "Trigger Update"}
          </ActionBtn>

          <ActionBtn
            variant={isPaused ? "success" : "warning"}
            disabled={!!actionLoading}
            onClick={() =>
              withAction("pause", () =>
                isPaused
                  ? resumeWalletBalanceQueue(token)
                  : pauseWalletBalanceQueue(token)
              )
            }
          >
            {isPaused ? (
              <MdOutlinePlayArrow className="text-lg" />
            ) : (
              <MdOutlinePause className="text-lg" />
            )}
            {actionLoading === "pause"
              ? "Updating…"
              : isPaused
              ? "Resume Queue"
              : "Pause Queue"}
          </ActionBtn>

          <ActionBtn
            variant="default"
            disabled={!!actionLoading}
            onClick={() =>
              withAction("clean", () => cleanWalletBalanceQueue(token))
            }
          >
            <TbBroom className="text-base" />
            {actionLoading === "clean" ? "Cleaning…" : "Clean Queue"}
          </ActionBtn>

          <ActionBtn
            variant="default"
            disabled={!!actionLoading}
            onClick={() =>
              withAction("aggregate", () => runSnapshotAggregation(token))
            }
          >
            <FaDatabase className="text-xs" />
            {actionLoading === "aggregate"
              ? "Running…"
              : "Aggregate Snapshots"}
          </ActionBtn>

          <ActionBtn
            variant="danger"
            disabled={!!actionLoading}
            onClick={() => {
              if (!confirm("Empty the entire queue? All pending jobs will be lost."))
                return;
              withAction("empty", () => emptyWalletBalanceQueue(token));
            }}
          >
            {actionLoading === "empty" ? "Emptying…" : "Empty Queue"}
          </ActionBtn>
        </div>

        {/* Active jobs progress */}
        {(dashboard?.queue?.recentActive?.length ?? 0) > 0 && (
          <div className="mt-5">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-3">
              Active Jobs
            </p>
            <div className="flex flex-col gap-2">
              {dashboard!.queue.recentActive.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl"
                >
                  <span className="text-xs font-mono text-gray-500 w-16">
                    #{job.id}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-black h-2 rounded-full transition-all duration-500"
                      style={{ width: `${job.progress ?? 0}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 w-10 text-right">
                    {job.progress ?? 0}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent failed jobs */}
        {(dashboard?.queue?.recentFailed?.length ?? 0) > 0 && (
          <div className="mt-5">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-3">
              Recent Failed Jobs
            </p>
            <div className="flex flex-col gap-2">
              {dashboard!.queue.recentFailed.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center gap-4 p-3 bg-red-50 rounded-xl"
                >
                  <span className="text-xs font-mono text-gray-500 w-16">
                    #{job.id}
                  </span>
                  <p className="flex-1 text-xs text-red-600 truncate">
                    {job.failedReason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Top wallets + Recently updated ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Top wallets */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Top Wallets by Balance
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-xs text-gray-400 uppercase tracking-wide border-b">
                  <th className="pb-2 text-left font-medium">Wallet</th>
                  <th className="pb-2 text-right font-medium">Balance</th>
                  <th className="pb-2 text-right font-medium">Last Update</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-400">
                      Loading…
                    </td>
                  </tr>
                ) : (dashboard?.topWallets?.length ?? 0) === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-400">
                      No wallets yet.
                    </td>
                  </tr>
                ) : (
                  dashboard!.topWallets.map((w, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="py-2.5 text-gray-500 text-xs font-mono">
                        {w.solAddress ?? w.ethAddress ?? w.userId.slice(0, 10)}
                      </td>
                      <td className="py-2.5 text-right font-semibold text-gray-800">
                        ${w.balance}
                      </td>
                      <td className="py-2.5 text-right text-gray-400 text-xs">
                        {timeAgo(w.lastUpdate)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recently updated */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Recently Updated
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-xs text-gray-400 uppercase tracking-wide border-b">
                  <th className="pb-2 text-left font-medium">User ID</th>
                  <th className="pb-2 text-right font-medium">Balance</th>
                  <th className="pb-2 text-right font-medium">Updates</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-400">
                      Loading…
                    </td>
                  </tr>
                ) : (dashboard?.recentlyUpdated?.length ?? 0) === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-400">
                      No recent updates.
                    </td>
                  </tr>
                ) : (
                  dashboard!.recentlyUpdated.map((w, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="py-2.5 text-gray-500 text-xs font-mono">
                        {w.userId.slice(0, 12)}…
                      </td>
                      <td className="py-2.5 text-right font-semibold text-gray-800">
                        ${w.balance}
                      </td>
                      <td className="py-2.5 text-right text-gray-500">
                        {w.totalUpdates}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Failed wallet updates ── */}
      {(dashboard?.failedUpdates?.length ?? 0) > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100">
          <h2 className="text-base font-semibold text-red-600 mb-4">
            Failed Wallet Updates
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-xs text-gray-400 uppercase tracking-wide border-b">
                  <th className="pb-2 text-left font-medium">User ID</th>
                  <th className="pb-2 text-left font-medium">Error</th>
                  <th className="pb-2 text-right font-medium">Time</th>
                  <th className="pb-2 text-right font-medium">Fail Count</th>
                </tr>
              </thead>
              <tbody>
                {dashboard!.failedUpdates.map((f, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-2.5 text-gray-500 text-xs font-mono">
                      {f.userId.slice(0, 12)}…
                    </td>
                    <td className="py-2.5 text-red-500 text-xs">{f.error}</td>
                    <td className="py-2.5 text-right text-gray-400 text-xs">
                      {f.errorAt ? timeAgo(f.errorAt) : "—"}
                    </td>
                    <td className="py-2.5 text-right font-semibold text-red-600">
                      {f.failCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Balance chart ── */}
      <BalanceChart token={token} />

      {/* ── All wallets table ── */}
      <WalletsTable token={token} />
    </div>
  );
}
