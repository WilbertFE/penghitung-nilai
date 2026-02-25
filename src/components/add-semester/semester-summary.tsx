import { TrendingUp, Percent, BookOpen } from "lucide-react";
import type { SubjectEntry } from "@/lib/types";

const GRADE_POINTS: Record<string, number> = { A: 4.0, B: 3.0, C: 2.0, D: 1.0, E: 0.0 };

function calcSummary(subjects: SubjectEntry[]) {
  const valid = subjects.filter((s) => s.name && s.score !== "" && s.grade && s.credits !== "");

  if (valid.length === 0) return { gpa: "—", avgScore: "—", total: 0 };

  const totalCredits = valid.reduce((sum, s) => sum + Number(s.credits), 0);
  const weightedGrade = valid.reduce(
    (sum, s) => sum + (GRADE_POINTS[s.grade] ?? 0) * Number(s.credits),
    0
  );
  const avgScore =
    valid.reduce((sum, s) => sum + Number(s.score), 0) / valid.length;

  return {
    gpa: totalCredits > 0 ? (weightedGrade / totalCredits).toFixed(2) : "—",
    avgScore: avgScore.toFixed(1),
    total: valid.length,
  };
}

interface SemesterSummaryProps {
  subjects: SubjectEntry[];
}

export function SemesterSummary({ subjects }: SemesterSummaryProps) {
  const { gpa, avgScore, total } = calcSummary(subjects);

  const stats = [
    { label: "GPA", value: gpa, icon: TrendingUp, iconColor: "text-primary", iconBg: "bg-primary/8" },
    { label: "Average Score", value: avgScore !== "—" ? `${avgScore}%` : "—", icon: Percent, iconColor: "text-emerald-600", iconBg: "bg-emerald-500/8" },
    { label: "Total Subjects", value: String(total), icon: BookOpen, iconColor: "text-sky-500", iconBg: "bg-sky-500/8" },
  ] as const;

  return (
    <div className="rounded-lg border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-[13px] font-semibold text-foreground">Semester Summary</h2>
        <p className="mt-0.5 text-[12px] text-muted-foreground">
          Calculated from the subjects entered above.
        </p>
      </div>
      <div className="grid grid-cols-3 divide-x divide-border">
        {stats.map(({ label, value, icon: Icon, iconColor, iconBg }) => (
          <div key={label} className="flex flex-col items-center gap-2 px-4 py-5 text-center sm:flex-row sm:gap-3 sm:text-left">
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${iconBg}`}>
              <Icon className={`h-[15px] w-[15px] ${iconColor}`} aria-hidden="true" />
            </span>
            <div>
              <p className="tabular text-[22px] font-semibold leading-none tracking-tight text-foreground">
                {value}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
