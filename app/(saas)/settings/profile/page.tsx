"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { TypographyH3 } from "@/shared/ui/typography";

import { InformationForm } from "./_components/form/information-form/information-form";
import { GithubAccount } from "./_components/github-account/github-account";

function ProfilePage() {
  return (
    <>
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

      <CardHeader className="p-4">
        <CardTitle>
          <TypographyH3>Profile</TypographyH3>
        </CardTitle>
        <CardDescription>You can edit all your information here.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-8 p-4 pt-0">
        <GithubAccount />
        <InformationForm />
      </CardContent>
    </>
  );
}

export default withClientOnly(withAuthenticated(ProfilePage));
