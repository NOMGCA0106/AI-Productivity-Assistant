import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToolPage } from "@/components/ToolPage";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — ClassroomAI" }] }),
  component: SettingsPage,
});

const KEY = "ipca-profile-v1";

function SettingsPage() {
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        setName(p.name ?? ""); setSchool(p.school ?? ""); setGrade(p.grade ?? "");
      }
    } catch { /* ignore */ }
  }, []);

  function save(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem(KEY, JSON.stringify({ name, school, grade }));
    toast.success("Profile saved.");
  }

  function reset() {
    if (!confirm("Reset all dashboard counters?")) return;
    localStorage.removeItem("ipca-stats-v1");
    window.dispatchEvent(new Event("ipca-stats-updated"));
    toast.success("Counters reset.");
  }

  return (
    <ToolPage
      title="Settings"
      description="Personalise your profile and manage local app data."
      icon={<SettingsIcon className="h-5 w-5" />}
    >
      <form onSubmit={save} className="grid gap-4 rounded-xl border bg-card p-5 shadow-sm md:max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="n">Your name</Label>
          <Input id="n" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ms. M. Dlamini" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="s">School</Label>
          <Input id="s" value={school} onChange={(e) => setSchool(e.target.value)} placeholder="Sunridge Primary" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="g">Grade taught</Label>
          <Input id="g" value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="Grade 5" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="submit">Save profile</Button>
          <Button type="button" variant="outline" onClick={reset}>Reset counters</Button>
        </div>
      </form>
    </ToolPage>
  );
}
