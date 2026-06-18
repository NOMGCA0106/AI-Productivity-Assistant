import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Mail,
  FileText,
  ListChecks,
  ClipboardSignature,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { readStats, type Stats } from "@/lib/stats";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — ClassroomAI" },
      {
        name: "description",
        content:
          "Overview of your AI-powered classroom workflow: emails, meeting summaries, task plans, and behaviour reports.",
      },
    ],
  }),
  component: Dashboard,
});

const cards = [
  { key: "emails" as const, label: "Emails Generated", icon: Mail, accent: "bg-primary/10 text-primary" },
  { key: "meetings" as const, label: "Meetings Summarized", icon: FileText, accent: "bg-success/15 text-success" },
  { key: "tasks" as const, label: "Tasks Planned", icon: ListChecks, accent: "bg-accent/30 text-accent-foreground" },
  { key: "reports" as const, label: "Behaviour Reports", icon: ClipboardSignature, accent: "bg-warning/25 text-warning-foreground" },
];

const actions = [
  { to: "/email", label: "Generate Email", icon: Mail },
  { to: "/meetings", label: "Summarize Meeting Notes", icon: FileText },
  { to: "/tasks", label: "Plan Tasks", icon: ListChecks },
  { to: "/behaviour", label: "Create Behaviour Report", icon: ClipboardSignature },
] as const;

function Dashboard() {
  const [stats, setStats] = useState<Stats>({ emails: 0, meetings: 0, tasks: 0, reports: 0 });
  useEffect(() => {
    const update = () => setStats(readStats());
    update();
    window.addEventListener("ipca-stats-updated", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("ipca-stats-updated", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 p-4 md:p-8">
      <section className="relative overflow-hidden rounded-2xl border bg-[image:var(--gradient-hero)] p-6 md:p-10 text-primary-foreground shadow-sm">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> AI-powered for Grades 4–6
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Welcome back, teacher.
          </h1>
          <p className="text-sm md:text-base text-primary-foreground/85">
            Save hours on admin every week. Draft parent emails, summarise staff meetings,
            plan your workload, and write professional behaviour reports — all in one place.
          </p>
        </div>
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 right-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
      </section>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.key} className="rounded-xl border bg-card p-5 shadow-sm">
            <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg ${c.accent}`}>
              <c.icon className="h-4 w-4" />
            </div>
            <div className="text-3xl font-bold tracking-tight">{stats[c.key]}</div>
            <div className="mt-1 text-xs font-medium text-muted-foreground">{c.label}</div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Quick actions
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="group flex items-center justify-between rounded-xl border bg-card p-4 shadow-sm transition hover:border-primary/40 hover:shadow-md"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <a.icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium">{a.label}</span>
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-card p-5 shadow-sm">
        <h3 className="text-sm font-semibold">How it works</h3>
        <ol className="mt-3 grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
          <li><span className="font-semibold text-foreground">1. Choose a tool</span> from the sidebar.</li>
          <li><span className="font-semibold text-foreground">2. Fill in</span> short context fields.</li>
          <li><span className="font-semibold text-foreground">3. Review & use</span> the AI output. Always check before sharing.</li>
        </ol>
      </section>
    </div>
  );
}
