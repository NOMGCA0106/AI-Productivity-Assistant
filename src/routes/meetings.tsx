import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToolPage, OutputPanel } from "@/components/ToolPage";
import { bumpStat, runAi } from "@/lib/stats";

export const Route = createFileRoute("/meetings")({
  head: () => ({ meta: [{ title: "Meeting Notes Summarizer — ClassroomAI" }] }),
  component: MeetingsPage,
});

function MeetingsPage() {
  const [notes, setNotes] = useState("");
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (notes.trim().length < 30) {
      toast.error("Please paste meeting notes (at least 30 characters).");
      return;
    }
    setLoading(true);
    setOut("");
    try {
      const text = await runAi(
        `You are a meeting minutes assistant for a South African primary school staff team.
TASK: Summarise the provided meeting notes into a clear, professional briefing.
OUTPUT FORMAT (use exactly these labelled sections, in order):
Executive Summary: 2-3 sentence overview.
Key Discussion Points: bullet list.
Decisions Made: bullet list.
Action Items: bullet list, each "- <action> — Owner: <name or role> — Deadline: <date or 'TBD'>".
Deadlines: chronological bullet list of dated commitments.
Responsible Persons: bullet list of person/role -> their responsibilities.
Rules: Be concise. Do not invent names, dates or decisions not present in the notes. Use "TBD" if missing.`,
        `Meeting notes:\n${notes}`,
      );
      setOut(text);
      bumpStat("meetings");
      toast.success("Summary ready.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolPage
      title="Meeting Notes Summarizer"
      description="Turn lengthy minutes into clear executive summaries with action items and deadlines."
      icon={<FileText className="h-5 w-5" />}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={submit} className="space-y-4 rounded-xl border bg-card p-5 shadow-sm">
          <div className="space-y-2">
            <Label htmlFor="notes">Meeting notes</Label>
            <Textarea id="notes" rows={18} value={notes} maxLength={15000}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste raw meeting notes, transcript, or bullet points here…" />
            <p className="text-xs text-muted-foreground">{notes.length.toLocaleString()} characters</p>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Summarising…" : "Summarize Notes"}
          </Button>
        </form>
        <OutputPanel text={out} loading={loading} />
      </div>
    </ToolPage>
  );
}
