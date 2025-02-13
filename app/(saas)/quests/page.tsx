"use client";

import { Target } from "lucide-react";

import { Icon } from "@/design-system/atoms/icon";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ListBanner } from "@/shared/features/list-banner/list-banner";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";

import { QuestList } from "./_features/quest-list/quest-list";

function QuestsPage() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-4xl pt-10">
        <NavigationBreadcrumb
          breadcrumb={[
            {
              id: "root",
              label: "Quests",
              iconProps: {
                component: Target,
              },
            },
          ]}
        />

        <ListBanner
          title={{ children: "ODQuests" }}
          subtitle={{
            children:
              "Quests transforms how contributors join open-source projects. Instead of applying to a single GitHub issue, they join a Squad working on a Quest—a set of related tasks aligned with the project’s goals.",
          }}
          logo={<Icon component={Target} classNames={{ base: "size-16" }} />}
        />

        <QuestList />
      </div>
    </PageContainer>
  );
}

export default withClientOnly(QuestsPage);
