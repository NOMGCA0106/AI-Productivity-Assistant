import { type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { AI_DISCLAIMER } from "@/lib/stats";

export function ToolPage({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-8">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </header>
      <div className="rounded-lg border border-warning/30 bg-warning/10 p-3 text-xs text-foreground/80 flex gap-2">
        <AlertTriangle className="h-4 w-4 shrink-0 text-warning-foreground mt-0.5" />
        <span>{AI_DISCLAIMER}</span>
      </div>
      {children}
    </div>
  );
}

export function OutputPanel({ text, loading }: { text: string; loading: boolean }) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm min-h-[280px]">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">AI Output</h3>
        {text && !loading && (
          <button
            onClick={() => navigator.clipboard.writeText(text)}
            className="text-xs text-primary hover:underline"
          >
            Copy
          </button>
        )}
      </div>
      {loading ? (
        <div className="space-y-3">
          <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-3 w-full animate-pulse rounded bg-muted" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
        </div>
      ) : text ? (
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
          {text}
        </pre>
      ) : (
        <p className="text-sm text-muted-foreground">
          Fill in the form and generate to see results here.
        </p>
      )}
    </div>
  );
}
