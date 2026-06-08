"use server";

const API = process.env.NEXT_PUBLIC_API_URL;
const BASE = `${API}/api/v5/admin/wallet-balance`;

async function apiFetch(
  token: string,
  path: string,
  options: RequestInit = {}
) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
      ...(options.headers as Record<string, string>),
    },
  });
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

export async function getWalletBalanceDashboard(token: string) {
  try {
    return await apiFetch(token, "/dashboard");
  } catch (e) {
    console.error("getWalletBalanceDashboard:", e);
    return { success: false };
  }
}

export async function getQueueStats(token: string) {
  try {
    return await apiFetch(token, "/queue-stats");
  } catch (e) {
    console.error("getQueueStats:", e);
    return { success: false };
  }
}

export async function getWalletBalanceHealth(token: string) {
  try {
    return await apiFetch(token, "/health");
  } catch (e) {
    console.error("getWalletBalanceHealth:", e);
    return { success: false };
  }
}

export async function getAllWallets(
  token: string,
  page: number = 1,
  limit: number = 20,
  hasBalance?: "true" | "false",
  needsUpdate?: "true" | "false"
) {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(hasBalance && { hasBalance }),
      ...(needsUpdate && { needsUpdate }),
    });
    return await apiFetch(token, `/wallets?${params}`);
  } catch (e) {
    console.error("getAllWallets:", e);
    return { success: false };
  }
}

export async function getWalletChart(
  token: string,
  userId: string,
  range: "daily" | "weekly" | "monthly" | "yearly" = "daily"
) {
  try {
    return await apiFetch(token, `/chart/${userId}?range=${range}`);
  } catch (e) {
    console.error("getWalletChart:", e);
    return { success: false };
  }
}

export async function triggerWalletBalanceUpdate(token: string) {
  try {
    return await apiFetch(token, "/trigger", { method: "POST" });
  } catch (e) {
    console.error("triggerWalletBalanceUpdate:", e);
    return { success: false };
  }
}

export async function cleanWalletBalanceQueue(token: string) {
  try {
    return await apiFetch(token, "/clean-queue", { method: "POST" });
  } catch (e) {
    console.error("cleanWalletBalanceQueue:", e);
    return { success: false };
  }
}

export async function emptyWalletBalanceQueue(token: string) {
  try {
    return await apiFetch(token, "/empty-queue", { method: "POST" });
  } catch (e) {
    console.error("emptyWalletBalanceQueue:", e);
    return { success: false };
  }
}

export async function pauseWalletBalanceQueue(token: string) {
  try {
    return await apiFetch(token, "/pause-queue", { method: "POST" });
  } catch (e) {
    console.error("pauseWalletBalanceQueue:", e);
    return { success: false };
  }
}

export async function resumeWalletBalanceQueue(token: string) {
  try {
    return await apiFetch(token, "/resume-queue", { method: "POST" });
  } catch (e) {
    console.error("resumeWalletBalanceQueue:", e);
    return { success: false };
  }
}

export async function runSnapshotAggregation(token: string) {
  try {
    return await apiFetch(token, "/aggregate-snapshots", { method: "POST" });
  } catch (e) {
    console.error("runSnapshotAggregation:", e);
    return { success: false };
  }
}
