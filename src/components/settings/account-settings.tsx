"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { profileUser } from "@/lib/data";

export function AccountSettings() {
  const u = profileUser;
  const [values, setValues] = useState({
    fullName:  u.fullName,
    email:     u.email,
    studentId: u.studentId,
    school:    u.school,
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

  const fields: {
    label: string;
    key: keyof typeof values;
    type?: string;
    disabled?: boolean;
  }[] = [
    { label: "Full Name",   key: "fullName" },
    { label: "Email",       key: "email",     type: "email", disabled: true },
    { label: "Student ID",  key: "studentId", disabled: true },
    { label: "School Name", key: "school" },
  ];

  return (
    <div className="rounded-lg border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-[13px] font-semibold text-foreground">Account Settings</h2>
        <p className="mt-0.5 text-[12px] text-muted-foreground">
          Update your name and school details.
        </p>
      </div>
      <form onSubmit={handleSave} className="p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map(({ label, key, type = "text", disabled }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <Label htmlFor={`acc-${key}`} className="text-[12px] font-medium text-muted-foreground">
                {label}
              </Label>
              <Input
                id={`acc-${key}`}
                type={type}
                value={values[key]}
                onChange={handleChange(key)}
                disabled={disabled}
                className="h-8 text-[13px] disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-3">
          <Button type="submit" size="sm" className="text-[12px]">
            Save Changes
          </Button>
          {saved && (
            <span className="text-[12px] text-[var(--success)]">Changes saved.</span>
          )}
        </div>
      </form>
    </div>
  );
}
