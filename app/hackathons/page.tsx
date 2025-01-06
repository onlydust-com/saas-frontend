"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { HackathonListBanner } from "@/app/hackathons/_features/hackathon-list-banner/hackathon-list-banner";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { Translate } from "@/shared/translation/components/translate/translate";

export function HackathonsPage() {
  return (
    <div className="pb-7xl">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: <Translate token={"hackathon:list.title"} />,
          },
        ]}
      />

      <div className="mx-auto flex flex-col gap-4xl py-4xl">
        <HackathonListBanner />
      </div>
    </div>
  );
}

export default withClientOnly(withAuthenticationRequired(HackathonsPage));
