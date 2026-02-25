import { Button } from "@/components/ui/button";
import { ShieldCheck, ShieldAlert, LogOut, KeyRound } from "lucide-react";
import type { ProfileUser } from "@/lib/types";

interface AccountSettingsCardProps {
  user: ProfileUser;
}

export function AccountSettingsCard({ user }: AccountSettingsCardProps) {
  const rows: {
    label: string;
    value: React.ReactNode;
    action?: React.ReactNode;
  }[] = [
    {
      label: "Password",
      value: (
        <span className="text-[13px] text-muted-foreground">
          Last changed —
        </span>
      ),
      action: (
        <Button variant="outline" size="sm" className="gap-1.5 text-[12px]">
          <KeyRound className="h-3 w-3" aria-hidden="true" />
          Change Password
        </Button>
      ),
    },
    {
      label: "Email verification",
      value: user.emailVerified ? (
        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--success)]">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          Verified
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-destructive">
          <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
          Not verified
        </span>
      ),
    },
    {
      label: "Account created",
      value: (
        <span className="text-[13px] text-foreground">
          {user.accountCreated}
        </span>
      ),
    },
  ];

  return (
    <div className="rounded-lg border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      {/* Card header */}
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-[13px] font-semibold text-foreground">
          Account Settings
        </h2>
        <p className="mt-0.5 text-[12px] text-muted-foreground">
          Manage your password, verification, and session.
        </p>
      </div>

      {/* Rows */}
      <ul className="divide-y divide-border">
        {rows.map(({ label, value, action }) => (
          <li
            key={label}
            className="flex items-center justify-between gap-4 px-5 py-3.5"
          >
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {label}
              </p>
              <div className="mt-0.5">{value}</div>
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </li>
        ))}
      </ul>

      {/* Logout — destructive zone */}
      <div className="border-t border-border px-5 py-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[13px] font-medium text-foreground">Sign out</p>
            <p className="text-[12px] text-muted-foreground">
              You will be signed out of all devices.
            </p>
          </div>
          <Button
            variant="destructive"
            size="sm"
            className="mt-3 gap-1.5 text-[12px] sm:mt-0"
          >
            <LogOut className="h-3 w-3" aria-hidden="true" />
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}
