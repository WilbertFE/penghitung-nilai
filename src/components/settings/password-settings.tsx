"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export function PasswordSettings() {
  const [values, setValues] = useState({
    current: "",
    next:    "",
    confirm: "",
  });
  const [show, setShow] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function handleChange(key: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      setSaved(false);
      setError("");
    };
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (values.next !== values.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (values.next.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setSaved(true);
    setValues({ current: "", next: "", confirm: "" });
  }

  const fields: { label: string; key: keyof typeof values; placeholder: string }[] = [
    { label: "Current Password", key: "current", placeholder: "Enter current password" },
    { label: "New Password",     key: "next",    placeholder: "At least 8 characters" },
    { label: "Confirm Password", key: "confirm", placeholder: "Repeat new password" },
  ];

  return (
    <div className="rounded-lg border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-[13px] font-semibold text-foreground">Password &amp; Security</h2>
        <p className="mt-0.5 text-[12px] text-muted-foreground">
          Change your password. Use at least 8 characters.
        </p>
      </div>
      <form onSubmit={handleSave} className="p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {fields.map(({ label, key, placeholder }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <Label htmlFor={`pwd-${key}`} className="text-[12px] font-medium text-muted-foreground">
                {label}
              </Label>
              <div className="relative">
                <Input
                  id={`pwd-${key}`}
                  type={show ? "text" : "password"}
                  value={values[key]}
                  onChange={handleChange(key)}
                  placeholder={placeholder}
                  className="h-8 pr-8 text-[13px]"
                  autoComplete="off"
                />
                {key === "current" && (
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground"
                    aria-label={show ? "Hide password" : "Show password"}
                  >
                    {show ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-3">
          <Button type="submit" size="sm" className="text-[12px]">
            Change Password
          </Button>
          {saved && <span className="text-[12px] text-[var(--success)]">Password updated.</span>}
          {error && <span className="text-[12px] text-destructive">{error}</span>}
        </div>
      </form>
    </div>
  );
}
