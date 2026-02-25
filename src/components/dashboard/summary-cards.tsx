import { TrendingUp, Award, BookMarked, Percent } from "lucide-react";
import { summaryStats } from "@/lib/data";

const cards = [
  {
    label: "Current GPA",
    value: summaryStats.currentGpa,
    delta: "+0.05",
    deltaLabel: "vs last semester",
    icon: TrendingUp,
    iconColor: "text-primary",
    iconBg: "bg-primary/8",
    positive: true,
  },
  {
    label: "Highest GPA",
    value: summaryStats.highestGpa,
    delta: "Sem 4",
    deltaLabel: "personal best",
    icon: Award,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/8",
    positive: true,
  },
  {
    label: "Semesters",
    value: String(summaryStats.totalSemesters),
    delta: "2 yrs",
    deltaLabel: "completed",
    icon: BookMarked,
    iconColor: "text-sky-500",
    iconBg: "bg-sky-500/8",
    positive: true,
  },
  {
    label: "Avg Score",
    value: `${summaryStats.averageScore}%`,
    delta: "All subjects",
    deltaLabel: "combined",
    icon: Percent,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-500/8",
    positive: true,
  },
] as const;

export function SummaryCards() {
  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {cards.map(
        ({
          label,
          value,
          delta,
          deltaLabel,
          icon: Icon,
          iconColor,
          iconBg,
        }) => (
          <div
            key={label}
            className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            {/* Icon + label row */}
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

            {/* Value */}
            <p className="tabular text-[26px] font-semibold leading-none tracking-tight text-foreground">
              {value}
            </p>

            {/* Delta */}
            <p className="text-[11px] text-muted-foreground">
              <span className="font-medium text-foreground/80">{delta}</span>{" "}
              {deltaLabel}
            </p>
          </div>
        ),
      )}
    </div>
  );
}
