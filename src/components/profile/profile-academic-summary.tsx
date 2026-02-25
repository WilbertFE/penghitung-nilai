import { TrendingUp, Award, BookMarked, Percent } from "lucide-react";
import { summaryStats } from "@/lib/data";

const cards = [
  {
    label: "Current GPA",
    value: summaryStats.currentGpa,
    sub: "This semester",
    icon: TrendingUp,
    iconColor: "text-primary",
    iconBg: "bg-primary/8",
  },
  {
    label: "Highest GPA",
    value: summaryStats.highestGpa,
    sub: "Personal best",
    icon: Award,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/8",
  },
  {
    label: "Semesters",
    value: String(summaryStats.totalSemesters),
    sub: "Completed",
    icon: BookMarked,
    iconColor: "text-sky-500",
    iconBg: "bg-sky-500/8",
  },
  {
    label: "Avg Score",
    value: `${summaryStats.averageScore}%`,
    sub: "All subjects",
    icon: Percent,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-500/8",
  },
] as const;

export function ProfileAcademicSummary() {
  return (
    <div className="rounded-lg border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      {/* Card header */}
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-[13px] font-semibold text-foreground">
          Academic Summary
        </h2>
        <p className="mt-0.5 text-[12px] text-muted-foreground">
          Cumulative performance across all semesters.
        </p>
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, sub, icon: Icon, iconColor, iconBg }) => (
          <div key={label} className="flex flex-col gap-3 bg-card p-4">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-muted-foreground">
                {label}
              </span>
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-md ${iconBg}`}
              >
                <Icon
                  className={`h-[14px] w-[14px] ${iconColor}`}
                  aria-hidden="true"
                />
              </span>
            </div>
            <p className="tabular text-[26px] font-semibold leading-none tracking-tight text-foreground">
              {value}
            </p>
            <p className="text-[11px] text-muted-foreground">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
