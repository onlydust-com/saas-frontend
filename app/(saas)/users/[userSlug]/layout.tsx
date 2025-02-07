import type { Metadata } from "next";
import { ReactNode } from "react";

import { UserNavigation } from "@/app/(saas)/users/[userSlug]/_features/user-navigation/user-navigation";

import { Paper } from "@/design-system/atoms/paper/variants/paper-default";

import { PageContainer } from "@/shared/features/page/page-container/page-container";

import { UserSummary } from "./_features/user-summary/user-summary";

type Props = {
  params: { userSlug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const userSlug = params.userSlug;

  return {
    openGraph: {
      images: [`https://previous.onlydust.com/u/${userSlug}/opengraph-image`],
    },
  };
}

export default function UsersLayout({ params, children }: { params: { userSlug: string }; children: ReactNode }) {
  return (
    <PageContainer size="medium" className="flex-1">
      <div className="flex flex-col items-start justify-start gap-4 pt-4 laptop:h-full laptop:flex-row">
        <div className="flex w-full flex-col gap-4 laptop:sticky laptop:top-20 laptop:w-[440px] laptop:min-w-[440px]">
          <UserSummary userSlug={params.userSlug} />
        </div>

        <Paper
          background="primary"
          border="primary"
          classNames={{ base: "overflow-hidden h-full flex flex-col" }}
          size="none"
        >
          <div className={"flex h-12 w-full items-end laptop:h-[86px]"}>
            <UserNavigation params={params} />
          </div>

          {children}
        </Paper>
      </div>
    </PageContainer>
  );
}
