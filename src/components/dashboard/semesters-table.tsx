import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { semesters } from "@/lib/data";
import type { Semester, SemesterStatus } from "@/lib/types";

const statusConfig: Record<
  SemesterStatus,
  { label: string; className: string }
> = {
  Completed: {
    label: "Completed",
    className: "bg-[var(--success-bg)] text-[var(--success)]",
  },
  "In Progress": {
    label: "In Progress",
    className: "bg-primary/8 text-primary",
  },
  Upcoming: { label: "Upcoming", className: "bg-muted text-muted-foreground" },
};

interface SemestersTableProps {
  data?: Semester[];
}

export function SemestersTable({ data = semesters }: SemestersTableProps) {
  return (
    <div className="rounded-lg border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <p className="text-[13px] font-semibold text-foreground">
            Semester History
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Academic performance by semester
          </p>
        </div>
        <span className="tabular rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
          {data.length} semesters
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              {["Semester", "GPA", "Avg Score", "Status"].map((h) => (
                <TableHead
                  key={h}
                  className="h-9 px-5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => {
              const status = statusConfig[row.status];
              return (
                <TableRow
                  key={row.semester}
                  className={cn(
                    "border-b border-border/60 transition-colors hover:bg-accent/40",
                    i === data.length - 1 && "border-0",
                  )}
                >
                  <TableCell className="px-5 py-3 text-[13px] font-medium text-foreground">
                    {row.semester}
                  </TableCell>
                  <TableCell className="tabular px-5 py-3 text-[13px] font-semibold text-foreground">
                    {row.gpa.toFixed(2)}
                  </TableCell>
                  <TableCell className="tabular px-5 py-3 text-[13px] text-muted-foreground">
                    {row.avgScore}%
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
                        status.className,
                      )}
                    >
                      {status.label}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
