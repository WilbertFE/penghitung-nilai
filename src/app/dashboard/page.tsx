"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  BarChart3,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  Settings,
} from "lucide-react";

const menu = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Input Nilai",
    href: "/dashboard/grades",
    icon: BookOpen,
  },
  {
    label: "Grafik",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    label: "Jurusan",
    href: "/dashboard/recommendations",
    icon: GraduationCap,
  },
  {
    label: "Pengaturan",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardPage() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-white">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-white/10">
        <div className="p-4 font-bold text-lg text-my-primary">NilaiKu</div>

        <nav className="flex md:flex-col gap-1 px-4 pb-4">
          {menu.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={<item.icon size={18} />}
              label={item.label}
              active={pathname === item.href}
            />
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 space-y-6">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold">
              Selamat datang 👋
            </h1>
            <p className="text-sm text-white/60">Kelas XII IPA · Semester 4</p>
          </div>

          <Avatar>
            <AvatarFallback className="bg-my-primary/20 text-my-primary">
              WB
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SummaryCard title="Rata-rata IPA" value="87.4" />
          <SummaryCard title="Rata-rata IPS" value="82.1" />
          <SummaryCard title="Total Mapel" value="14" />
          <SummaryCard title="Semester" value="4" />
        </div>

        {/* Chart placeholder */}
        <Card className="bg-slate-900 border-white/10">
          <CardHeader>
            <CardTitle className="text-my-primary">
              Perkembangan Nilai
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center text-sm border border-dashed border-white/10 text-white/50 rounded-md">
              Grafik nilai per semester (placeholder)
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-my-primary/10 border-my-primary/30">
          <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6">
            <p className="text-sm text-white/80">
              ⚠️ Data semester 5 belum lengkap
            </p>
            <Button className="bg-my-primary hover:bg-my-primary/90 text-white">
              Lanjutkan Input Nilai
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

/* =========================
   COMPONENTS
========================= */

function SidebarItem({
  icon,
  label,
  href,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition w-full ${
        active
          ? "bg-my-primary/20 text-my-primary"
          : "text-white/70 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </Link>
  );
}

function SummaryCard({ title, value }: any) {
  return (
    <Card className="bg-slate-900 border-white/10">
      <CardContent className="p-4">
        <p className="text-xs text-white/60">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
