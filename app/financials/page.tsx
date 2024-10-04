"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

import { SponsorsTable } from "@/app/financials/_features/sponsors-table/sponsors-table";

import { Contribution } from "@/core/domain/contribution/contribution-contract.types";

import { Typo } from "@/design-system/atoms/typo";
import { CardContributionKanban } from "@/design-system/molecules/cards/card-contribution-kanban/variants/card-contribution-kanban-default";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { useShowSponsorList } from "@/shared/hooks/sponsors/use-show-sponsor-list";
import { Translate } from "@/shared/translation/components/translate/translate";

function withSponsorList<P extends object>(Component: ComponentType<P>) {
  return function WithSponsorList(props: P) {
    const [showSponsorList] = useShowSponsorList();
    const router = useRouter();

    useEffect(() => {
      if (showSponsorList.loading) return;

      if (!showSponsorList.hasMultipleSponsors) {
        router.push(NEXT_ROUTER.financials.details.root(showSponsorList.firstSponsor ?? ""));
      }
    }, [showSponsorList, router]);

    if (showSponsorList.loading) {
      return null;
    }

    return <Component {...props} />;
  };
}

const c: Contribution = {
  type: "ISSUE",
  repo: {
    id: 650626566,
    owner: "onlydustxyz",
    name: "marketplace-backend",
    description: "Awesome repo",
    htmlUrl: "https://github.com/onlydustxyz/marketplace-backend",
  },
  githubAuthor: {
    githubUserId: 595505,
    login: "ofux",
    avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
  },
  githubNumber: 6,
  githubStatus: "OPEN",
  githubTitle:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam architecto beatae corporis dolorem necessitatibus nisi quam temporibus velit voluptatum. Adipisci animi corporis deserunt odit quod repudiandae tempora ut voluptas?",
  githubHtmlUrl: "string",
  githubBody: "string",
  githubCodeReviewOutcome: "PENDING",
  id: "string",
  createdAt: "2024-10-03T15:24:26.490Z",
  completedAt: "2024-10-03T15:24:26.490Z",
  lastUpdatedAt: "2024-10-03T15:24:26.491Z",
  status: "IN_PROGRESS",
  githubPullRequestReviewState: "PENDING_REVIEWER",
  rewardIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
  project: {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    slug: "my-awesome-project",
    name: "string",
    logoUrl: "string",
    shortDescription: "A short project description",
    visibility: "PUBLIC",
    languages: [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        slug: "string",
        name: "Rust",
        logoUrl: "https://rust.org/logo.png",
        bannerUrl: "https://rust.org/banner.png",
      },
    ],
  },
  contributor: {
    githubUserId: 595505,
    login: "ofux",
    avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
    isRegistered: true,
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  },
  links: [
    {
      type: "ISSUE",
      repo: {
        id: 650626566,
        owner: "onlydustxyz",
        name: "marketplace-backend",
        description: "Awesome repo",
        htmlUrl: "https://github.com/onlydustxyz/marketplace-backend",
      },
      githubAuthor: {
        githubUserId: 595505,
        login: "ofux",
        avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
      },
      githubNumber: 6,
      githubStatus: "OPEN",
      githubTitle: "string",
      githubHtmlUrl: "string",
      githubBody: "string",
      githubCodeReviewOutcome: "PENDING",
      is_mine: true,
    },
  ],
};

function FinancialPage() {
  return (
    <PageWrapper
      navigation={{
        breadcrumbs: [
          {
            id: "root",
            label: <Translate token={"financials:list.header.title"} />,
          },
        ],
      }}
    >
      <ScrollView>
        <div>
          <CardContributionKanban contribution={c} />
        </div>
        <PageContent>
          <div className="grid h-full gap-3">
            <Typo
              size={"xs"}
              weight={"medium"}
              variant={"heading"}
              translate={{
                token: "financials:list.content.title",
              }}
            />

            <SponsorsTable />
          </div>
        </PageContent>
      </ScrollView>
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(withSponsorList(FinancialPage)));
