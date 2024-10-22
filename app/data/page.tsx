"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { ActiveUsersSection } from "@/app/data/_sections/active-users-section/active-users-section";
import { DataSection } from "@/app/data/_sections/data-section/data-section";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { Translate } from "@/shared/translation/components/translate/translate";

function DataPage() {
  return (
    <PageWrapper
      navigation={{
        breadcrumbs: [
          {
            id: "root",
            label: <Translate token={"data:details.header.title"} />,
          },
        ],
      }}
    >
      <AnimatedColumn className="h-full">
        <ScrollView className="flex flex-col gap-md">
          <PageContent>
            <DataSection />
          </PageContent>

          <PageContent>
            <ActiveUsersSection />
          </PageContent>
        </ScrollView>
      </AnimatedColumn>
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(DataPage));
