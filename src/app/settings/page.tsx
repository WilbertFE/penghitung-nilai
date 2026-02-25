import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AccountSettings } from "@/components/settings/account-settings";
import { PasswordSettings } from "@/components/settings/password-settings";
import { AppearanceSettings } from "@/components/settings/appearance-settings";
import { NotificationSettings } from "@/components/settings/notification-settings";
import { AccountManagement } from "@/components/settings/account-management";

export default function SettingsPage() {
  return (
    <DashboardLayout title="Settings">
      <div>
        <h2 className="text-balance text-[15px] font-semibold text-foreground">
          Settings
        </h2>
        <p className="mt-0.5 text-[12px] text-muted-foreground leading-relaxed">
          Manage your account, security, appearance, and notification
          preferences.
        </p>
      </div>

      <AccountSettings />
      <PasswordSettings />
      <AppearanceSettings />
      <NotificationSettings />
      <AccountManagement />
    </DashboardLayout>
  );
}
