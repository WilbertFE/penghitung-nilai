import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import type { ProfileUser } from "@/lib/types";

interface ProfileHeaderProps {
  user: ProfileUser;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:flex-row sm:items-center sm:justify-between">
      {/* Avatar + info */}
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground text-[18px] font-bold">
            {user.initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-foreground leading-tight">
            {user.fullName}
          </p>
          <p className="mt-0.5 text-[12px] text-muted-foreground">
            {user.email}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-[11px] text-muted-foreground">
              <span className="font-medium text-foreground/70">ID</span>{" "}
              {user.studentId}
            </span>
            <span
              className="hidden text-muted-foreground/40 sm:block"
              aria-hidden="true"
            >
              ·
            </span>
            <span className="text-[11px] text-muted-foreground">
              {user.school}
            </span>
          </div>
        </div>
      </div>

      {/* Edit button */}
      <Button
        variant="outline"
        size="sm"
        className="w-full gap-1.5 text-[12px] sm:w-auto"
      >
        <Pencil className="h-3 w-3" aria-hidden="true" />
        Edit Profile
      </Button>
    </div>
  );
}
