"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { ProfileUser } from "@/lib/types";

interface PersonalInfoCardProps {
  user: ProfileUser;
}

export function PersonalInfoCard({ user }: PersonalInfoCardProps) {
  const [values, setValues] = useState({
    fullName: user.fullName,
    email: user.email,
    studentId: user.studentId,
    school: user.school,
    gradeClass: user.gradeClass,
  });

  const [saved, setSaved] = useState(false);

  function handleChange(key: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      setSaved(false);
    };
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
  }

  const fields: { label: string; key: keyof typeof values; type?: string }[] = [
    { label: "Full Name", key: "fullName" },
    { label: "Email", key: "email", type: "email" },
    { label: "Student ID", key: "studentId" },
    { label: "School Name", key: "school" },
    { label: "Grade / Class", key: "gradeClass" },
  ];

  return (
    <div className="rounded-lg border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      {/* Card header */}
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-[13px] font-semibold text-foreground">
          Personal Information
        </h2>
        <p className="mt-0.5 text-[12px] text-muted-foreground">
          Update your name, email, and school details.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map(({ label, key, type = "text" }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <Label
                htmlFor={`field-${key}`}
                className="text-[12px] font-medium text-muted-foreground"
              >
                {label}
              </Label>
              <Input
                id={`field-${key}`}
                type={type}
                value={values[key]}
                onChange={handleChange(key)}
                className="h-8 text-[13px]"
              />
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Button type="submit" size="sm" className="text-[12px]">
            Save Changes
          </Button>
          {saved && (
            <span className="text-[12px] text-[var(--success)]">
              Changes saved.
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
