import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ToolPage, OutputPanel } from "@/components/ToolPage";
import { bumpStat, runAi } from "@/lib/stats";

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [{ title: "Smart Email Generator — ClassroomAI" }] }),
  component: EmailPage,
});

const schema = z.object({
  recipient: z.string().min(1),
  subject: z.string().trim().min(2).max(140),
  purpose: z.string().trim().min(5).max(2000),
  tone: z.string().min(1),
});

function EmailPage() {
  const [recipient, setRecipient] = useState("Parent");
  const [subject, setSubject] = useState("");
  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState("Formal");
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ recipient, subject, purpose, tone });
    if (!parsed.success) {
      toast.error("Please complete all fields correctly.");
      return;
    }
    setLoading(true);
    setOut("");
    try {
      const text = await runAi(
        `You are an experienced Intermediate Phase (Grades 4-6) teacher's communication assistant.
TASK: Draft a professional, respectful school email appropriate for an educational setting.
OUTPUT FORMAT (use exactly these labelled sections):
Subject: <subject line>
Greeting: <greeting>
Body: <2-4 short paragraphs>
Closing: <professional closing with placeholder for teacher name>
Rules: Clear, concise, age-appropriate, no jargon, no fabricated facts. If information is missing, use neutral placeholders like [date] or [learner name].`,
        `Recipient type: ${recipient}
Subject: ${subject}
Tone: ${tone}
Purpose / context: ${purpose}`,
      );
      setOut(text);
      bumpStat("emails");
      toast.success("Email generated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolPage
      title="Smart Email Generator"
      description="Draft professional school emails to parents, principals, HODs, and colleagues."
      icon={<Mail className="h-5 w-5" />}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={submit} className="space-y-4 rounded-xl border bg-card p-5 shadow-sm">
          <div className="space-y-2">
            <Label>Recipient</Label>
            <Select value={recipient} onValueChange={setRecipient}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Parent", "Principal", "HOD", "Colleague"].map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subj">Subject</Label>
            <Input id="subj" value={subject} maxLength={140} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Term 2 reading progress update" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose of email</Label>
            <Textarea id="purpose" rows={6} maxLength={2000} value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Describe what you need to communicate, key facts, dates, names…" />
          </div>
          <div className="space-y-2">
            <Label>Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Formal", "Friendly", "Urgent", "Persuasive"].map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Generating…" : "Generate Email"}
          </Button>
        </form>
        <OutputPanel text={out} loading={loading} />
      </div>
    </ToolPage>
  );
}
