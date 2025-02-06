"use client";

import { SettingsHeader } from "@/app/(saas)/settings/_features/settings-header/settings-header";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { withAuthenticated } from "@/shared/providers/auth-provider";

import { InformationForm } from "./_components/form/information-form/information-form";
import { GithubAccount } from "./_components/github-account/github-account";

function ProfilePage() {
  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Settings",
          },
          {
            id: "profile",
            label: "Profile",
          },
        ]}
      />

      <SettingsHeader title="Profile" description="You can edit all your information here." />

      <GithubAccount />

      <InformationForm />
    </div>
  );
}

export default withClientOnly(withAuthenticated(ProfilePage));
