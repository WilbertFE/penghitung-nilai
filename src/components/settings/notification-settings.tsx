"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface NotifRow {
  key: string;
  label: string;
  description: string;
}

const ROWS: NotifRow[] = [
  {
    key: "email",
    label: "Email notifications",
    description: "Receive important updates and announcements via email.",
  },
  {
    key: "gpa",
    label: "GPA change alerts",
    description: "Get notified whenever your cumulative GPA changes.",
  },
  {
    key: "semester",
    label: "Semester reminders",
    description: "Reminders for upcoming semester start and end dates.",
  },
  {
    key: "weekly",
    label: "Weekly progress report",
    description: "A summary of your academic progress every Monday.",
  },
];

export function NotificationSettings() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    email: true,
    gpa: true,
    semester: false,
    weekly: false,
  });
  const [saved, setSaved] = useState(false);

  function toggle(key: string) {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
    setSaved(false);
  }

  return (
    <div className="rounded-lg border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-[13px] font-semibold text-foreground">Notifications</h2>
        <p className="mt-0.5 text-[12px] text-muted-foreground">
          Control which notifications you receive.
        </p>
      </div>
      <ul className="divide-y divide-border">
        {ROWS.map(({ key, label, description }) => (
          <li key={key} className="flex items-center justify-between gap-6 px-5 py-4">
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-foreground">{label}</p>
              <p className="mt-0.5 text-[12px] text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
            <Switch
              checked={prefs[key]}
              onCheckedChange={() => toggle(key)}
              aria-label={label}
              className="shrink-0"
            />
          </li>
        ))}
      </ul>
      <div className="border-t border-border px-5 py-4">
        <div className="flex items-center gap-3">
          <Button size="sm" className="text-[12px]" onClick={() => setSaved(true)}>
            Save Preferences
          </Button>
          {saved && <span className="text-[12px] text-[var(--success)]">Preferences saved.</span>}
        </div>
      </div>
    </div>
  );
}
