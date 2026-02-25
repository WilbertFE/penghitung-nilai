"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SemesterInfo as SemesterInfoType } from "@/lib/types";

interface SemesterInfoProps {
  info: SemesterInfoType;
  onChange: (field: keyof SemesterInfoType, value: string) => void;
}

export function SemesterInfo({ info, onChange }: SemesterInfoProps) {
  return (
    <div className="rounded-lg border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      {/* Card header */}
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-[13px] font-semibold text-foreground">Semester Information</h2>
        <p className="mt-0.5 text-[12px] text-muted-foreground">
          Basic details about this semester.
        </p>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
        {/* Semester Name */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="semester-name" className="text-[12px] font-medium text-foreground">
            Semester Name
          </Label>
          <Input
            id="semester-name"
            value={info.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="e.g. Semester 5"
            className="h-8 text-[13px]"
          />
        </div>

        {/* Academic Year */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="academic-year" className="text-[12px] font-medium text-foreground">
            Academic Year
          </Label>
          <Input
            id="academic-year"
            value={info.academicYear}
            onChange={(e) => onChange("academicYear", e.target.value)}
            placeholder="e.g. 2024/2025"
            className="h-8 text-[13px]"
          />
        </div>

        {/* Grade Level */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="grade-level" className="text-[12px] font-medium text-foreground">
            Grade Level / Class
          </Label>
          <Input
            id="grade-level"
            value={info.gradeLevel}
            onChange={(e) => onChange("gradeLevel", e.target.value)}
            placeholder="e.g. Grade 11"
            className="h-8 text-[13px]"
          />
        </div>

        {/* Semester Type */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="semester-type" className="text-[12px] font-medium text-foreground">
            Semester Type
          </Label>
          <Select value={info.type} onValueChange={(v) => onChange("type", v)}>
            <SelectTrigger id="semester-type" className="h-8 text-[13px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="odd" className="text-[13px]">Odd Semester</SelectItem>
              <SelectItem value="even" className="text-[13px]">Even Semester</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
