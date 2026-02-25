import { Button } from "@/components/ui/button";
import { LogOut, Trash2 } from "lucide-react";

export function AccountManagement() {
  return (
    <div className="rounded-lg border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-[13px] font-semibold text-foreground">Account Management</h2>
        <p className="mt-0.5 text-[12px] text-muted-foreground">
          Manage your session and account data.
        </p>
      </div>

      {/* Sign out row */}
      <div className="flex flex-col gap-1 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[13px] font-medium text-foreground">Sign out</p>
          <p className="mt-0.5 text-[12px] text-muted-foreground">
            You will be signed out of all devices.
          </p>
        </div>
        <Button variant="outline" size="sm" className="mt-3 gap-1.5 text-[12px] sm:mt-0">
          <LogOut className="h-3 w-3" aria-hidden="true" />
          Log out
        </Button>
      </div>

      {/* Delete account row */}
      <div className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[13px] font-medium text-foreground">Delete account</p>
          <p className="mt-0.5 text-[12px] text-muted-foreground">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
        </div>
        <Button variant="destructive" size="sm" className="mt-3 gap-1.5 text-[12px] sm:mt-0">
          <Trash2 className="h-3 w-3" aria-hidden="true" />
          Delete Account
        </Button>
      </div>
    </div>
  );
}
