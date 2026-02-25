"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sun, Moon, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

const THEMES: { value: Theme; label: string; icon: React.ElementType; description: string }[] = [
  { value: "light",  label: "Light",  icon: Sun,     description: "Clean white interface" },
  { value: "dark",   label: "Dark",   icon: Moon,    description: "Easy on the eyes at night" },
  { value: "system", label: "System", icon: Monitor, description: "Follows your OS setting" },
];

export function AppearanceSettings() {
  const [theme, setTheme] = useState<Theme>("light");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="rounded-lg border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-[13px] font-semibold text-foreground">Appearance</h2>
        <p className="mt-0.5 text-[12px] text-muted-foreground">
          Choose how GradeTracker looks to you.
        </p>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {THEMES.map(({ value, label, icon: Icon, description }) => {
            const active = theme === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => { setTheme(value); setSaved(false); }}
                className={cn(
                  "flex flex-col gap-2 rounded-md border px-4 py-3.5 text-left transition-colors",
                  active
                    ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                    : "border-border hover:border-muted-foreground/30 hover:bg-accent"
                )}
              >
                <Icon
                  className={cn("h-4 w-4", active ? "text-primary" : "text-muted-foreground")}
                  aria-hidden="true"
                />
                <div>
                  <p className={cn("text-[13px] font-medium", active ? "text-foreground" : "text-muted-foreground")}>
                    {label}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{description}</p>
                </div>
              </button>
            );
          })}
        </div>
        <div className="mt-5 flex items-center gap-3">
          <Button size="sm" className="text-[12px]" onClick={handleSave}>
            Save Preference
          </Button>
          {saved && <span className="text-[12px] text-[var(--success)]">Preference saved.</span>}
        </div>
      </div>
    </div>
  );
}
