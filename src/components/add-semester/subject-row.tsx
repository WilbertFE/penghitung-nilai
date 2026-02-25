"use client";

import { Trash2, GripVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SubjectEntry } from "@/lib/types";

interface SubjectRowProps {
  subject: SubjectEntry;
  index: number;
  canRemove: boolean;
  onChange: (id: string, field: keyof SubjectEntry, value: string) => void;
  onRemove: (id: string) => void;
}

export const GRADES = [
  { label: "A  (90–100)", value: "A", min: 90 },
  { label: "B  (75–89)",  value: "B", min: 75 },
  { label: "C  (60–74)",  value: "C", min: 60 },
  { label: "D  (40–59)",  value: "D", min: 40 },
  { label: "E  (0–39)",   value: "E", min: 0  },
] as const;

/** Derive letter grade from numeric score (auto-fill). */
export function scoreToGrade(raw: string): string {
  const n = Number(raw);
  if (!raw || isNaN(n)) return "";
  if (n >= 90) return "A";
  if (n >= 75) return "B";
  if (n >= 60) return "C";
  if (n >= 40) return "D";
  return "E";
}

const GRADE_COLOR: Record<string, string> = {
  A: "text-emerald-600 bg-emerald-50 border-emerald-200",
  B: "text-sky-600    bg-sky-50    border-sky-200",
  C: "text-amber-600  bg-amber-50  border-amber-200",
  D: "text-orange-600 bg-orange-50 border-orange-200",
  E: "text-red-600    bg-red-50    border-red-200",
};

export function SubjectRow({ subject, index, canRemove, onChange, onRemove }: SubjectRowProps) {
  function handleScoreChange(raw: string) {
    // Clamp to 0-100
    const clamped =
      raw === "" ? "" : String(Math.min(100, Math.max(0, Number(raw))));
    onChange(subject.id, "score", clamped);
    // Auto-derive grade unless already manually overridden to differ
    const derived = scoreToGrade(clamped);
    if (derived) onChange(subject.id, "grade", derived);
  }

  const gradeColor = subject.grade ? GRADE_COLOR[subject.grade] : "";

  return (
    <div
      className={cn(
        "group relative grid grid-cols-1 gap-x-3 gap-y-2 rounded-md border border-border bg-card",
        "px-3 py-3 transition-shadow duration-150",
        "sm:grid-cols-[20px_1fr_80px_80px_64px_36px] sm:items-center sm:py-2.5",
        "hover:shadow-[0_2px_6px_rgba(0,0,0,0.06)]"
      )}
    >
      {/* Drag handle / row number — desktop */}
      <div className="hidden sm:flex items-center justify-center text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors cursor-grab active:cursor-grabbing">
        <GripVertical className="h-3.5 w-3.5" aria-hidden="true" />
      </div>

      {/* Mobile row label */}
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:hidden">
        Subject {index + 1}
      </p>

      {/* Subject name */}
      <div className="flex flex-col gap-1 sm:gap-0">
        <label className="text-[11px] text-muted-foreground sm:sr-only">Subject Name</label>
        <Input
          value={subject.name}
          onChange={(e) => onChange(subject.id, "name", e.target.value)}
          placeholder="e.g. Mathematics"
          className="h-8 text-[13px] bg-background"
          aria-label={`Subject ${index + 1} name`}
        />
      </div>

      {/* Score */}
      <div className="flex flex-col gap-1 sm:gap-0">
        <label className="text-[11px] text-muted-foreground sm:sr-only">Score</label>
        <Input
          type="number"
          min={0}
          max={100}
          value={subject.score}
          onChange={(e) => handleScoreChange(e.target.value)}
          placeholder="0–100"
          className="h-8 text-[13px] tabular bg-background"
          aria-label={`Subject ${index + 1} score`}
        />
      </div>

      {/* Grade — auto-derived, still overridable */}
      <div className="flex flex-col gap-1 sm:gap-0">
        <label className="text-[11px] text-muted-foreground sm:sr-only">Grade</label>
        <Select
          value={subject.grade}
          onValueChange={(v) => onChange(subject.id, "grade", v)}
        >
          <SelectTrigger
            className={cn("h-8 text-[13px] border font-medium transition-colors", gradeColor || "bg-background")}
            aria-label={`Subject ${index + 1} grade`}
          >
            <SelectValue placeholder="Grade" />
          </SelectTrigger>
          <SelectContent>
            {GRADES.map((g) => (
              <SelectItem key={g.value} value={g.value} className="text-[13px] font-mono">
                {g.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Credits */}
      <div className="flex flex-col gap-1 sm:gap-0">
        <label className="text-[11px] text-muted-foreground sm:sr-only">Credits (SKS)</label>
        <Input
          type="number"
          min={1}
          max={6}
          value={subject.credits}
          onChange={(e) =>
            onChange(subject.id, "credits", String(Math.min(6, Math.max(1, Number(e.target.value)))))
          }
          placeholder="SKS"
          className="h-8 text-[13px] tabular bg-background"
          aria-label={`Subject ${index + 1} credits`}
        />
      </div>

      {/* Remove */}
      <div className="absolute right-2 top-2 sm:static sm:flex sm:justify-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={!canRemove}
          onClick={() => onRemove(subject.id)}
          className={cn(
            "h-7 w-7 rounded-md text-muted-foreground/50 transition-colors",
            "hover:bg-destructive/8 hover:text-destructive",
            "disabled:pointer-events-none disabled:opacity-25"
          )}
          aria-label={`Remove subject ${index + 1}`}
        >
          <Trash2 className="h-[13px] w-[13px]" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
