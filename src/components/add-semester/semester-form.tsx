"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SemesterInfo } from "@/components/add-semester/semester-info";
import { SubjectRow } from "@/components/add-semester/subject-row";
import { SemesterSummary } from "@/components/add-semester/semester-summary";
import { cn } from "@/lib/utils";
import type { SemesterInfo as SemesterInfoType, SubjectEntry } from "@/lib/types";

function makeSubject(): SubjectEntry {
  return { id: crypto.randomUUID(), name: "", score: "", grade: "", credits: "" };
}

export function SemesterForm() {
  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const [info, setInfo] = useState<SemesterInfoType>({
    name: "",
    academicYear: "",
    gradeLevel: "",
    type: "",
  });

  const [subjects, setSubjects] = useState<SubjectEntry[]>([makeSubject()]);

  const handleInfoChange = useCallback(
    (field: keyof SemesterInfoType, value: string) =>
      setInfo((prev) => ({ ...prev, [field]: value })),
    []
  );

  const handleSubjectChange = useCallback(
    (id: string, field: keyof SubjectEntry, value: string) =>
      setSubjects((prev) =>
        prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
      ),
    []
  );

  const addSubject = useCallback(() => {
    const next = makeSubject();
    setJustAddedId(next.id);
    setSubjects((prev) => [...prev, next]);
  }, []);

  // Scroll newly added row into view and focus its name input
  useEffect(() => {
    if (!justAddedId) return;
    const timer = setTimeout(() => {
      const el = listRef.current?.querySelector<HTMLElement>(
        `[data-row-id="${justAddedId}"] input`
      );
      el?.focus({ preventScroll: false });
      el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      setJustAddedId(null);
    }, 50);
    return () => clearTimeout(timer);
  }, [justAddedId]);

  const removeSubject = useCallback(
    (id: string) => setSubjects((prev) => prev.filter((s) => s.id !== id)),
    []
  );

  const filledCount = subjects.filter((s) => s.name.trim()).length;

  return (
    <div className="flex flex-col gap-5">
      <SemesterInfo info={info} onChange={handleInfoChange} />

      {/* Subjects card */}
      <div className="rounded-lg border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <div>
            <h2 className="text-[13px] font-semibold text-foreground">Subjects &amp; Grades</h2>
            <p className="mt-0.5 text-[12px] text-muted-foreground">
              {filledCount === 0
                ? "Add your subjects below."
                : `${filledCount} of ${subjects.length} subject${subjects.length !== 1 ? "s" : ""} filled in.`}
            </p>
          </div>
          <span className="tabular rounded-full border border-border bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
            {subjects.length}
          </span>
        </div>

        <div className="p-5">
          {/* Column headers — desktop only */}
          <div className="mb-2 hidden sm:grid sm:grid-cols-[20px_1fr_80px_80px_64px_36px] sm:gap-x-3 sm:px-0">
            {["", "Subject Name", "Score", "Grade", "Credits (SKS)", ""].map((h, i) => (
              <span
                key={i}
                className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows with enter animation */}
          <div ref={listRef} className="flex flex-col gap-2">
            {subjects.map((subject, index) => (
              <div
                key={subject.id}
                data-row-id={subject.id}
                className={cn(
                  "transition-all duration-200 ease-out",
                  subject.id === justAddedId
                    ? "animate-in fade-in slide-in-from-bottom-1"
                    : ""
                )}
              >
                <SubjectRow
                  subject={subject}
                  index={index}
                  canRemove={subjects.length > 1}
                  onChange={handleSubjectChange}
                  onRemove={removeSubject}
                />
              </div>
            ))}
          </div>

          {/* Empty state hint — shown until at least one subject is filled */}
          {subjects.length === 1 && !subjects[0].name && (
            <div className="mt-3 flex items-center gap-2 rounded-md border border-dashed border-border bg-muted/40 px-4 py-3 text-[12px] text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Start by entering a subject name, then fill in the score — the grade is auto-calculated.
            </div>
          )}

          {/* Add row */}
          <div className="mt-4 flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSubject}
              className="h-8 gap-1.5 text-[12px]"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              Add Subject
            </Button>
            {subjects.length >= 5 && (
              <span className="text-[11px] text-muted-foreground">
                {subjects.length} subjects added
              </span>
            )}
          </div>
        </div>
      </div>

      <SemesterSummary subjects={subjects} />

      {/* Actions */}
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          className="h-9 px-5 text-[13px]"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button type="button" className="h-9 px-5 text-[13px]">
          Save Semester
        </Button>
      </div>
    </div>
  );
}
