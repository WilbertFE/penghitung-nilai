"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { gpaChartData } from "@/lib/data";
import type { GpaDataPoint } from "@/lib/types";

// ─── Tooltip ──────────────────────────────────────────────────────────────────

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border bg-card px-3 py-2 shadow-md">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-0.5 tabular text-[13px] font-semibold text-foreground">
        {payload[0].value.toFixed(2)}
      </p>
    </div>
  );
}

// ─── Chart ────────────────────────────────────────────────────────────────────

interface GpaChartProps {
  data?: GpaDataPoint[];
}

export function GpaChart({ data = gpaChartData }: GpaChartProps) {
  return (
    <div className="flex flex-col rounded-lg border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <p className="text-[13px] font-semibold text-foreground">
            GPA Progression
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Cumulative trend across all semesters
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="h-2 w-2 rounded-full bg-primary"
            aria-hidden="true"
          />
          <span className="text-[11px] font-medium text-muted-foreground">
            GPA
          </span>
        </div>
      </div>

      {/* Chart body */}
      <div className="p-4 pt-3">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart
            data={data}
            margin={{ top: 6, right: 4, left: -22, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gpaFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.12}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border)"
              vertical={false}
              strokeOpacity={0.8}
            />
            <XAxis
              dataKey="semester"
              tick={{
                fontSize: 11,
                fill: "var(--color-muted-foreground)",
                fontFamily: "var(--font-sans)",
              }}
              axisLine={false}
              tickLine={false}
              dy={6}
            />
            <YAxis
              domain={[3.2, 4.0]}
              ticks={[3.2, 3.4, 3.6, 3.8, 4.0]}
              tick={{
                fontSize: 11,
                fill: "var(--color-muted-foreground)",
                fontFamily: "var(--font-mono)",
              }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "var(--color-border)", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="gpa"
              stroke="var(--color-primary)"
              strokeWidth={1.5}
              fill="url(#gpaFill)"
              dot={{
                r: 3.5,
                fill: "var(--color-primary)",
                stroke: "var(--color-card)",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 5,
                fill: "var(--color-primary)",
                stroke: "var(--color-card)",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
