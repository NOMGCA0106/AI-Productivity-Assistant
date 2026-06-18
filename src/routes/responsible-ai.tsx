import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Lock, ScrollText, UserCheck, AlertTriangle } from "lucide-react";
import { ToolPage } from "@/components/ToolPage";
import { AI_DISCLAIMER } from "@/lib/stats";

export const Route = createFileRoute("/responsible-ai")({
  head: () => ({ meta: [{ title: "Responsible AI — ClassroomAI" }] }),
  component: ResponsibleAi,
});

const sections = [
  {
    icon: AlertTriangle,
    title: "AI Disclaimer",
    body: AI_DISCLAIMER,
  },
  {
    icon: Lock,
    title: "Privacy Notice",
    body:
      "Inputs you enter are sent to the AI model only to generate your requested output. Avoid pasting unnecessary personal information about learners, parents, or colleagues. Do not include ID numbers, addresses, medical records, or other sensitive personal information.",
  },
  {
    icon: ScrollText,
    title: "Ethical Use Guidelines",
    body:
      "Use this assistant to draft, summarise, and plan — not to make final decisions about learners, staff, or discipline. Outputs must be reviewed for accuracy, fairness, and cultural sensitivity. Do not use this tool to generate disciplinary outcomes, assessments of learner ability, or content that could be biased or discriminatory.",
  },
  {
    icon: UserCheck,
    title: "Human Review Reminder",
    body:
      "A qualified educator must read and approve every output before it is shared with parents, learners, the principal, or stored in school records. AI is a drafting partner, not a decision-maker.",
  },
];

function ResponsibleAi() {
  return (
    <ToolPage
      title="Responsible AI"
      description="How this assistant uses AI safely, ethically, and in service of teachers."
      icon={<ShieldCheck className="h-5 w-5" />}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((s) => (
          <div key={s.title} className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border bg-secondary/40 p-5 text-sm leading-relaxed">
        <h3 className="text-base font-semibold">Our commitment</h3>
        <p className="mt-2 text-muted-foreground">
          ClassroomAI is designed for Intermediate Phase teachers. It exists to reduce
          administrative load so educators can spend more time with learners. We treat AI as
          a supportive co-pilot — your professional judgment always comes first.
        </p>
      </div>
    </ToolPage>
  );
}
