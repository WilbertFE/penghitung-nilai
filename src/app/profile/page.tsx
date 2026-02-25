import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ProfileHeader } from "@/components/profile/profile-header";
import { PersonalInfoCard } from "@/components/profile/personal-info-card";
import { ProfileAcademicSummary } from "@/components/profile/profile-academic-summary";
import { AccountSettingsCard } from "@/components/profile/account-settings-card";
import { profileUser } from "@/lib/data";

export default function ProfilePage() {
  return (
    <DashboardLayout title="Profile">
      {/* Page heading */}
      <div>
        <h2 className="text-balance text-[15px] font-semibold text-foreground">
          Your Profile
        </h2>
        <p className="mt-0.5 text-[12px] text-muted-foreground leading-relaxed">
          Manage your personal information, academic record, and account
          settings.
        </p>
      </div>

      {/* Profile header card */}
      <ProfileHeader user={profileUser} />

      {/* Personal info form */}
      <PersonalInfoCard user={profileUser} />

      {/* Academic summary */}
      <ProfileAcademicSummary />

      {/* Account settings */}
      <AccountSettingsCard user={profileUser} />
    </DashboardLayout>
  );
}
