import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { SemesterForm } from "@/components/add-semester/semester-form";

export default function AddSemesterPage() {
  return (
    <DashboardLayout title="Add New Semester">
      {/* Page header */}
      <div>
        <h1 className="text-[18px] font-semibold tracking-tight text-foreground">
          Add New Semester
        </h1>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Enter your semester information and subject grades.
        </p>
      </div>

      {/* Form */}
      <SemesterForm />
    </DashboardLayout>
  );
}
