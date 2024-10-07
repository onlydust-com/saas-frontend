"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

import { SponsorsTable } from "@/app/financials/_features/sponsors-table/sponsors-table";

import { ContributionActivity } from "@/core/domain/contribution/models/contribution-activity-model";

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

const c = {
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
  githubLabels: [
    {
      name: "string",
      description: "string",
    },
    {
      name: "string",
      description: "string",
    },
  ],
  id: "string",
  createdAt: "2024-10-04T12:45:02.234Z",
  completedAt: "2024-10-04T12:45:02.234Z",
  lastUpdatedAt: "2024-10-04T12:45:02.234Z",
  activityStatus: "NOT_ASSIGNED",
  contributors: [
    {
      githubUserId: 595505,
      login: "ofux",
      avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
      isRegistered: true,
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    },
    {
      githubUserId: 595505,
      login: "ofux",
      avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
      isRegistered: true,
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    },
  ],
  applicants: [
    {
      githubUserId: 595505,
      login: "ofux",
      avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
      isRegistered: true,
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    },
    {
      githubUserId: 595505,
      login: "ofux",
      avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
      isRegistered: true,
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    },
  ],
  linkedIssues: [
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
      githubLabels: [
        {
          name: "string",
          description: "string",
        },
      ],
    },
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
      githubLabels: [
        {
          name: "string",
          description: "string",
        },
      ],
    },
  ],
  totalRewardedAmount: {
    totalAmount: 0,
    details: [
      {
        amount: 100,
        prettyAmount: 0,
        currency: {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          code: "USDC",
          name: "USD Coin",
          logoUrl: "string",
          decimals: 0,
        },
        usdEquivalent: 100,
        usdConversionRate: 1.5,
      },
    ],
  },
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
          <CardContributionKanban contribution={new ContributionActivity(c)} />
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
