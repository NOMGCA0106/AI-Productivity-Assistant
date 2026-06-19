import { createFileRoute } from "@tanstack/react-router";
import {
  GraduationCap,
  Users,
  BookOpen,
  Library,
  School,
  Sparkles,
  Printer,
  Mail,
  MapPin,
  Award,
  Lightbulb,
  Heart,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Professional Experience — Lwando Nomgca" },
      {
        name: "description",
        content:
          "Bachelor of Education (Intermediate Phase) student at CPUT. Teaching practice, mentorship, and AI-driven educational innovation.",
      },
      { property: "og:title", content: "Professional Experience — Lwando Nomgca" },
      {
        property: "og:description",
        content:
          "Teaching practice, student mentorship, community engagement, and AI-powered classroom innovation.",
      },
    ],
  }),
  component: ResumePage,
});

const subjects = [
  "Mathematics",
  "Natural Sciences & Technology",
  "Social Sciences",
  "Home Language",
  "First Additional Language",
  "Life Skills",
];

const teachingResponsibilities = [
  "Planned and delivered CAPS-aligned lessons",
  "Facilitated learner-centred classroom activities",
  "Assessed learner progress through formal and informal assessments",
  "Managed classroom behaviour and promoted positive learning environments",
  "Differentiated instruction to accommodate diverse learning needs",
  "Collaborated with mentor teachers and school management teams",
  "Developed educational resources and learning materials",
  "Reflected on teaching practices to improve learner outcomes",
];

const roles = [
  {
    icon: Users,
    title: "Student Mentor",
    org: "CPUT First-Year Mentorship Programme",
    bullets: [
      "Assisted first-year B.Ed students in transitioning to university life",
      "Provided academic guidance and support",
      "Facilitated communication between students and faculty",
      "Coordinated student engagement activities",
      "Supported online and face-to-face mentoring sessions",
      "Helped students navigate academic and personal challenges",
    ],
  },
  {
    icon: School,
    title: "School Liaison Officer",
    org: "Edu Social Collaboration",
    bullets: [
      "Supported learner and student engagement initiatives",
      "Assisted communication between students, mentors, and academic staff",
      "Facilitated student support programmes",
      "Promoted educational success and community involvement",
      "Helped organise educational activities and events",
    ],
  },
  {
    icon: BookOpen,
    title: "Teacher Assistant",
    org: "Claremont High School · Cape Town",
    bullets: [
      "Assisted teachers with classroom management and administration",
      "Supported learners with academic activities",
      "Helped prepare learning materials and classroom resources",
      "Assisted with maintaining an organised learning environment",
    ],
  },
  {
    icon: Library,
    title: "Library Assistant",
    org: "YearBeyond Programme",
    bullets: [
      "Supported literacy and educational development initiatives",
      "Assisted learners with accessing educational resources",
      "Promoted reading and learning programmes",
      "Supported digital literacy activities",
      "Assisted with library administration and organisation",
    ],
  },
];

const impact = [
  {
    icon: Award,
    title: "Educational Leadership",
    body: "Through mentoring, student leadership, and school engagement, I help create supportive learning environments that encourage academic success and personal growth.",
  },
  {
    icon: Lightbulb,
    title: "Teacher Development",
    body: "Teaching practice has built my classroom management, assessment, lesson planning, and learner support skills — the foundation of quality education.",
  },
  {
    icon: Heart,
    title: "Community Engagement",
    body: "Through YearBeyond and Edu Social Collaboration, I have contributed to literacy support and educational development in local communities.",
  },
  {
    icon: Rocket,
    title: "EdTech & Innovation",
    body: "My AI-Powered Classroom Management Assistant demonstrates how innovative digital solutions can lift teacher productivity and support educational excellence.",
  },
  {
    icon: TrendingUp,
    title: "Lifelong Learning",
    body: "I continually expand my knowledge, strengthen professional skills, and stay informed about emerging educational trends and technologies.",
  },
];

function ResumePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.12),transparent_60%)]" />
        <div className="mx-auto max-w-5xl px-6 pt-16 pb-12 sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Badge variant="secondary" className="mb-4 gap-1.5">
                <Sparkles className="h-3 w-3" />
                Professional Portfolio
              </Badge>
              <h1 className="font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
                Lwando Nomgca
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                Bachelor of Education · Intermediate Phase · CPUT
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> Cape Town, South Africa
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4" /> Grades 4–6 Educator
                </span>
              </div>
            </div>
            <div className="flex gap-2 print:hidden">
              <Button variant="outline" onClick={() => window.print()} className="gap-2">
                <Printer className="h-4 w-4" /> Print
              </Button>
              <Button asChild className="gap-2">
                <a href="mailto:hello@example.com">
                  <Mail className="h-4 w-4" /> Contact
                </a>
              </Button>
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-base leading-relaxed text-foreground/80">
            A passionate Intermediate Phase educator-in-training combining classroom practice,
            student mentorship, and a deep interest in educational technology. Builder of the
            AI-Powered Classroom Management Assistant — a productivity platform designed to give
            teachers their time back.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8 space-y-16">
        {/* Teaching Practice */}
        <section>
          <SectionHeader
            eyebrow="01 — Experience"
            title="Teaching Practice"
            subtitle="Cape Peninsula University of Technology"
          />
          <Card className="p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Throughout my Bachelor of Education (Intermediate Phase) studies, I have completed
              teaching practice placements in diverse classroom environments — applying educational
              theory in real classrooms while developing core professional teaching competencies.
            </p>

            <h3 className="mt-8 mb-3 text-xs font-semibold uppercase tracking-wider text-foreground/70">
              Key Responsibilities
            </h3>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {teachingResponsibilities.map((r) => (
                <li key={r} className="flex gap-2.5 text-sm text-foreground/90">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {r}
                </li>
              ))}
            </ul>

            <Separator className="my-6" />

            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground/70">
              Subjects Taught
            </h3>
            <div className="flex flex-wrap gap-2">
              {subjects.map((s) => (
                <Badge key={s} variant="outline" className="font-normal">
                  {s}
                </Badge>
              ))}
            </div>
          </Card>
        </section>

        {/* Roles */}
        <section>
          <SectionHeader
            eyebrow="02 — Leadership & Service"
            title="Mentorship & Support Roles"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {roles.map((role) => (
              <Card key={role.title} className="p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <role.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground">{role.title}</h3>
                    <p className="text-xs text-muted-foreground">{role.org}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {role.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-foreground/85">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                      {b}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Impact */}
        <section>
          <SectionHeader eyebrow="03 — Impact" title="What I bring to a school" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {impact.map((i) => (
              <Card
                key={i.title}
                className="group relative overflow-hidden p-6 transition-shadow hover:shadow-lg"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-125" />
                <i.icon className="relative h-6 w-6 text-primary" />
                <h3 className="relative mt-4 font-semibold text-foreground">{i.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {i.body}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-8 text-center sm:p-12">
          <Sparkles className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-4 font-display text-2xl font-bold text-foreground sm:text-3xl">
            Let's build classrooms where teachers thrive.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Open to teaching positions, internships, and collaborations in Intermediate Phase
            education and educational technology.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 print:hidden">
            <Button asChild>
              <a href="mailto:hello@example.com">Get in touch</a>
            </Button>
            <Button asChild variant="outline">
              <a href="/">Explore the AI Assistant</a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}
