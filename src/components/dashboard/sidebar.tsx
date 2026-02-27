"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  PlusSquare,
  BarChart2,
  User,
  Settings,
  LogOut,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// ─── Nav config ───────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  active?: boolean;
}

const NAV_SECTIONS: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "My Grades", href: "/my-grades", icon: BookOpen },
      { label: "Analytics", href: "#", icon: BarChart2 },
    ],
  },
  {
    heading: "Manage",
    items: [
      { label: "Add Semester", href: "/add-semester", icon: PlusSquare },
      { label: "Profile", href: "/profile", icon: User },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

// ─── Shared nav content ───────────────────────────────────────────────────────

function SidebarContent() {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col">
      {/* Logo wordmark */}
      <div className="flex h-14.25 shrink-0 items-center gap-2.5 border-b border-sidebar-border px-4">
        <div className="flex h-6.5 w-6.5 items-center justify-center rounded-md bg-primary">
          <GraduationCap
            className="h-3.5 w-3.5 text-primary-foreground"
            aria-hidden="true"
          />
        </div>
        <span className="text-[13px] font-semibold tracking-tight text-sidebar-foreground">
          Arkiva
        </span>
      </div>

      {/* Nav sections */}
      <nav
        className="flex-1 overflow-y-auto px-2 py-3"
        aria-label="Main navigation"
      >
        {NAV_SECTIONS.map(({ heading, items }) => (
          <div key={heading} className="mb-4">
            <p className="mb-1 px-2 text-[10px] font-medium uppercase tracking-widest text-sidebar-foreground/35">
              {heading}
            </p>
            <ul className="flex flex-col gap-px">
              {items.map(({ label, href, icon: Icon }) => {
                const active = href !== "#" && pathname === href;
                return (
                  <li key={label}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group flex items-center gap-2.5 rounded-md px-2.5 py-1.75 text-[13px] transition-colors",
                        active
                          ? "bg-sidebar-accent text-sidebar-foreground font-medium"
                          : "font-normal text-sidebar-foreground/55 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-3.75 w-3.75 shrink-0",
                          active
                            ? "text-primary"
                            : "text-sidebar-foreground/40 group-hover:text-sidebar-foreground/70",
                        )}
                        aria-hidden="true"
                      />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout footer */}
      <div className="shrink-0 border-t border-sidebar-border px-2 py-2">
        <button className="group flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.75 text-[13px] text-sidebar-foreground/55 transition-colors hover:bg-sidebar-accent/70 hover:text-sidebar-foreground">
          <LogOut
            className="h-3.75 w-3.75 shrink-0 text-sidebar-foreground/40 group-hover:text-sidebar-foreground/70"
            aria-hidden="true"
          />
          Log out
        </button>
      </div>
    </div>
  );
}

// ─── Desktop sidebar ──────────────────────────────────────────────────────────

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-55 flex-col bg-sidebar lg:flex">
      <SidebarContent />
    </aside>
  );
}

// ─── Mobile drawer ────────────────────────────────────────────────────────────

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-55 p-0 bg-sidebar border-r border-sidebar-border"
      >
        <VisuallyHidden>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Main navigation menu</SheetDescription>
        </VisuallyHidden>
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
