"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { CardContent, CardDescription, CardTitle } from "@/shared/ui/card";
import { CardHeader } from "@/shared/ui/card";
import { TypographyH3 } from "@/shared/ui/typography";

import { InformationForm } from "./_components/form/information-form/information-form";
import { GithubAccount } from "./_components/github-account/github-account";

function ProfilePage() {
  return (
    <>
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
