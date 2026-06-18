export type StatKey = "emails" | "meetings" | "tasks" | "reports";

const KEY = "ipca-stats-v1";

export type Stats = Record<StatKey, number>;

const empty: Stats = { emails: 0, meetings: 0, tasks: 0, reports: 0 };

export function readStats(): Stats {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return empty;
  }
}

export function bumpStat(key: StatKey) {
  if (typeof window === "undefined") return;
  const s = readStats();
  s[key] = (s[key] ?? 0) + 1;
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new Event("ipca-stats-updated"));
}

export async function runAi(system: string, prompt: string): Promise<string> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ system, prompt }),
  });
  if (!res.ok) {
    if (res.status === 429) throw new Error("Rate limit reached. Please try again shortly.");
    if (res.status === 402)
      throw new Error("AI credits exhausted. Please add credits to continue.");
    throw new Error(`Request failed (${res.status})`);
  }
  const data = (await res.json()) as { text: string };
  return data.text;
}

export const AI_DISCLAIMER =
  "AI-generated content may contain errors or inaccuracies. Teachers should review all generated outputs before sharing, submitting, or implementing them. This system is designed to support professional decision-making and not replace human judgment.";
