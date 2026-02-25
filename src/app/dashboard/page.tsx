import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { GpaChart } from "@/components/dashboard/gpa-chart";
import { PerformanceSnapshot } from "@/components/dashboard/peformance-snapshot";
import { SemestersTable } from "@/components/dashboard/semesters-table";
import { currentUser } from "@/lib/data";

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard">
      {/* Welcome row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-balance text-[15px] font-semibold text-foreground">
            Good morning, {currentUser.name}
          </h2>
          <p className="mt-0.5 text-[12px] text-muted-foreground leading-relaxed">
            {
              "Your GPA has improved every term — you're on track for Dean's List again."
            }
          </p>
        </div>
      </div>

      {/* KPI cards */}
      <SummaryCards />

      {/* Chart + snapshot — 3/5 + 2/5 split */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <GpaChart />
        </div>
        <div className="lg:col-span-2">
          <PerformanceSnapshot />
        </div>
      </div>

      {/* Semester history */}
      <SemestersTable />
    </DashboardLayout>
  );
}
