import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ClipboardSignature } from "lucide-react";
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

export const Route = createFileRoute("/behaviour")({
  head: () => ({ meta: [{ title: "Behaviour Report Generator — ClassroomAI" }] }),
  component: BehaviourPage,
});

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  grade: z.string().min(1),
  date: z.string().min(1),
  incident: z.string().trim().min(10).max(2500),
  observations: z.string().trim().min(5).max(2000),
});

function BehaviourPage() {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("Grade 5");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [incident, setIncident] = useState("");
  const [observations, setObservations] = useState("");
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ name, grade, date, incident, observations });
    if (!parsed.success) {
      toast.error("Please complete all fields correctly.");
      return;
    }
    setLoading(true);
    setOut("");
    try {
      const text = await runAi(
        `You are an Intermediate Phase teacher's writing assistant for learner behaviour documentation.
TASK: Produce a fair, factual, school-appropriate behaviour report suitable for a learner file.
OUTPUT FORMAT (use exactly these labelled sections, in order):
Incident Summary: 2-3 neutral sentences.
Behaviour Report: structured paragraphs covering context, behaviour observed, impact on learning environment, and learner response.
Recommended Actions: numbered list of restorative, age-appropriate steps (Grades 4-6).
Follow-Up Suggestions: bullet list covering parent communication, support referrals, and review timeline.
Rules:
- Use objective, professional language. Avoid labels like "bad", "naughty", or diagnoses.
- Stick to what the teacher reported; do not invent details.
- Reference only the supplied learner. Do not name other learners — use "Learner B" if needed.
- Centre dignity, restorative practice, and the school code of conduct.`,
        `Learner name: ${name}
Grade: ${grade}
Date of incident: ${date}
Incident description: ${incident}
Teacher observations: ${observations}`,
      );
      setOut(text);
      bumpStat("reports");
      toast.success("Report drafted.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolPage
      title="Learner Behaviour Report Generator"
      description="Document behaviour incidents professionally, objectively, and restoratively."
      icon={<ClipboardSignature className="h-5 w-5" />}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={submit} className="space-y-4 rounded-xl border bg-card p-5 shadow-sm">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="name">Learner name</Label>
              <Input id="name" value={name} maxLength={100} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
            </div>
            <div className="space-y-2">
              <Label>Grade</Label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Grade 4", "Grade 5", "Grade 6"].map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="inc">Incident description</Label>
            <Textarea id="inc" rows={5} maxLength={2500} value={incident}
              onChange={(e) => setIncident(e.target.value)}
              placeholder="What happened, where, when, who was involved (factual only)." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="obs">Teacher observations</Label>
            <Textarea id="obs" rows={4} maxLength={2000} value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Patterns noticed, possible triggers, learner's response, prior interventions." />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Drafting…" : "Generate Report"}
          </Button>
        </form>
        <OutputPanel text={out} loading={loading} />
      </div>
    </ToolPage>
  );
}
