import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListChecks, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ToolPage, OutputPanel } from "@/components/ToolPage";
import { bumpStat, runAi } from "@/lib/stats";

export const Route = createFileRoute("/tasks")({
  head: () => ({ meta: [{ title: "AI Task Planner — ClassroomAI" }] }),
  component: TasksPage,
});

type Task = { desc: string; due: string; priority: string };

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([{ desc: "", due: "", priority: "Medium" }]);
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);

  function update(i: number, patch: Partial<Task>) {
    setTasks((t) => t.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));
  }
  function add() { setTasks((t) => [...t, { desc: "", due: "", priority: "Medium" }]); }
  function remove(i: number) { setTasks((t) => t.filter((_, idx) => idx !== i)); }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = tasks.filter((t) => t.desc.trim().length > 2);
    if (cleaned.length === 0) {
      toast.error("Add at least one task description.");
      return;
    }
    setLoading(true);
    setOut("");
    try {
      const taskList = cleaned
        .map((t, i) => `${i + 1}. ${t.desc} | Due: ${t.due || "unspecified"} | Priority: ${t.priority}`)
        .join("\n");
      const text = await runAi(
        `You are a productivity coach for Intermediate Phase (Grades 4-6) teachers.
TASK: Build a realistic, kind workload plan from the task list.
OUTPUT FORMAT (use exactly these labelled sections, in order):
Priority Ranking: numbered list of tasks ranked High -> Low with one-line rationale.
Daily Plan: today's schedule using time blocks (e.g. 07:30-08:00) with task and intent.
Weekly Planner: bullet list "Mon: …", "Tue: …", … through Sun, distributing tasks before deadlines.
Time Optimisation Suggestions: 3-5 concrete tips (batching, transitions, marking efficiency, learner-led admin, etc.).
Rules: Respect deadlines. Protect teaching time. Keep evenings light. Do not invent tasks.`,
        `Tasks:\n${taskList}\n\nToday's date: ${new Date().toDateString()}`,
      );
      setOut(text);
      bumpStat("tasks");
      toast.success("Plan ready.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolPage
      title="AI Task Planner"
      description="Get a prioritised daily and weekly plan tailored to your teaching workload."
      icon={<ListChecks className="h-5 w-5" />}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={submit} className="space-y-4 rounded-xl border bg-card p-5 shadow-sm">
          <div className="space-y-3">
            {tasks.map((t, i) => (
              <div key={i} className="space-y-2 rounded-lg border bg-background p-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs uppercase tracking-wide text-muted-foreground">Task {i + 1}</Label>
                  {tasks.length > 1 && (
                    <button type="button" onClick={() => remove(i)} className="text-muted-foreground hover:text-destructive">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <Input value={t.desc} maxLength={300}
                  onChange={(e) => update(i, { desc: e.target.value })}
                  placeholder="Task description (e.g. Mark Grade 5 maths tests)" />
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" value={t.due} onChange={(e) => update(i, { due: e.target.value })} />
                  <Select value={t.priority} onValueChange={(v) => update(i, { priority: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Low", "Medium", "High", "Urgent"].map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" onClick={add} className="w-full">
            <Plus className="mr-1 h-4 w-4" /> Add another task
          </Button>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Planning…" : "Generate Plan"}
          </Button>
        </form>
        <OutputPanel text={out} loading={loading} />
      </div>
    </ToolPage>
  );
}
