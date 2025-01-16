"use client";

import logo from "@/public/images/logos/logo-light-purple.svg";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Image from "next/image";

import { HackathonList } from "@/app/hackathons/_features/hackathon-list/hackathon-list";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ListBanner } from "@/shared/features/list-banner/list-banner";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { Translate } from "@/shared/translation/components/translate/translate";

function HackathonsPage() {
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
        <ListBanner
          title={{ translate: { token: "hackathon:list.banner.title" } }}
          subtitle={{ translate: { token: "hackathon:list.banner.subtitle" } }}
          logo={<Image src={logo} alt="OnlyDust" width={64} height={64} className="size-16" />}
        />

        <HackathonList />
      </div>
    </div>
  );
}

export default withClientOnly(withAuthenticationRequired(HackathonsPage));
