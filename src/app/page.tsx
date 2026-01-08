/* eslint-disable @typescript-eslint/no-explicit-any */
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

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-my-background text-my-text">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-my-primary/20">
        <div className="p-4 font-bold text-lg text-my-primary">NilaiKu</div>
        <nav className="flex md:flex-col gap-2 px-4 pb-4">
          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            active
          />
          <SidebarItem icon={<BookOpen size={18} />} label="Input Nilai" />
          <SidebarItem icon={<BarChart3 size={18} />} label="Grafik" />
          <SidebarItem icon={<GraduationCap size={18} />} label="Jurusan" />
          <SidebarItem icon={<Settings size={18} />} label="Pengaturan" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 space-y-6">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-my-primary">
              Selamat datang 👋
            </h1>
            <p className="text-sm opacity-80">Kelas XII IPA · Semester 4</p>
          </div>
          <Avatar>
            <AvatarFallback className="bg-my-secondary text-white">
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
        <Card className="border-my-primary/20">
          <CardHeader>
            <CardTitle className="text-my-primary">
              Perkembangan Nilai
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center text-sm border rounded-md border-dashed border-my-secondary text-my-secondary">
              Grafik nilai per semester (placeholder)
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="border-dashed border-my-growth bg-my-growth/10">
          <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6">
            <p className="text-sm">⚠️ Data semester 5 belum lengkap</p>
            <Button className="bg-my-primary hover:bg-my-primary/90 text-white">
              Lanjutkan Input Nilai
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active = false }: any) {
  return (
    <button
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition w-full justify-center md:justify-start ${
        active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
      }`}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}

function SummaryCard({ title, value }: any) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
