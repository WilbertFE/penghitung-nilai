"use client";

import { Bell, Menu, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { currentUser } from "@/lib/data";
import type { User } from "@/lib/types";

interface TopbarProps {
  title: string;
  onMenuClick: () => void;
  user?: User;
}

export function Topbar({
  title,
  onMenuClick,
  user = currentUser,
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-[57px] items-center justify-between border-b border-border bg-card px-4 sm:px-6">
      {/* Left — mobile hamburger + page title */}
      <div className="flex items-center gap-3">
        <button
          aria-label="Open navigation menu"
          onClick={onMenuClick}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
        >
          <Menu className="h-[18px] w-[18px]" aria-hidden="true" />
        </button>
        <h1 className="text-[13px] font-semibold text-foreground">{title}</h1>
      </div>

      {/* Right — bell + user */}
      <div className="flex items-center gap-1">
        {/* Notification bell */}
        <button
          aria-label="Notifications"
          className="relative flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Bell className="h-[15px] w-[15px]" aria-hidden="true" />
          <span
            className="absolute right-[7px] top-[7px] h-1.5 w-1.5 rounded-full bg-primary"
            aria-hidden="true"
          />
        </button>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-accent"
              aria-label={`User menu for ${user.name}`}
            >
              <Avatar className="h-[22px] w-[22px]">
                <AvatarFallback className="bg-primary text-primary-foreground text-[9px] font-bold">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-[13px] font-medium text-foreground sm:block">
                {user.name}
              </span>
              <ChevronDown
                className="hidden h-3 w-3 text-muted-foreground sm:block"
                aria-hidden="true"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 text-[13px]">
            <DropdownMenuLabel className="pb-1">
              <p className="font-medium text-[13px]">{user.name}</p>
              <p className="text-[11px] font-normal text-muted-foreground">
                {user.email}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-[13px] cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-[13px] cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-[13px] cursor-pointer text-destructive focus:text-destructive">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
