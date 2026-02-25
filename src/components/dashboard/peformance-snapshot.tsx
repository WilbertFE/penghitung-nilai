import { performanceStats } from "@/lib/data";
import type { PerformanceStat } from "@/lib/types";

interface PerformanceSnapshotProps {
  stats?: PerformanceStat[];
}

export function PerformanceSnapshot({
  stats = performanceStats,
}: PerformanceSnapshotProps) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="border-b border-border px-5 py-4">
        <p className="text-[13px] font-semibold text-foreground">Performance</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          Key highlights this term
        </p>
      </div>

      {/* Rows */}
      <ul className="flex flex-1 flex-col divide-y divide-border">
        {stats.map(({ label, value, sub }) => (
          <li
            key={label}
            className="flex items-center justify-between gap-4 px-5 py-3.5"
          >
            <div className="min-w-0">
              <p className="truncate text-[12px] font-medium text-foreground">
                {label}
              </p>
              <p className="text-[11px] text-muted-foreground">{sub}</p>
            </div>
            <span className="tabular shrink-0 text-[13px] font-semibold text-primary">
              {value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
