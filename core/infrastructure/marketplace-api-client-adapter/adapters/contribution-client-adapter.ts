import {
  GetContributionByIdResponse,
  GetContributionEventsResponse,
  GetContributionsResponse,
} from "@/core/domain/contribution/contribution-contract.types";
import { ContributionActivity } from "@/core/domain/contribution/models/contribution-activity-model";
import { ContributionEvent } from "@/core/domain/contribution/models/contribution-event-model";
import { ContributionStoragePort } from "@/core/domain/contribution/output/contribution-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

const repo: GetContributionByIdResponse["repo"] = {
  id: 650626566,
  owner: "onlydustxyz",
  name: "marketplace-backend",
  description: "Awesome repo",
  htmlUrl: "https://github.com/onlydustxyz/marketplace-backend",
};

const githubAuthor: GetContributionByIdResponse["githubAuthor"] = {
  githubUserId: 595505,
  login: "ofux",
  avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
};

const project: GetContributionByIdResponse["project"] = {
  id: "",
  slug: "bretzel",
  name: "Bretzel",
};

const contributors: GetContributionByIdResponse["contributors"] = [
  {
    languages: [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        slug: "string",
        name: "Rust",
        logoUrl: "https://rust.org/logo.png",
        bannerUrl: "https://rust.org/banner.png",
      },
    ],
    ecosystems: [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "Ethereum Foundation",
        url: "https://ethereum.org",
        logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/8506434858363286425.png",
        bannerUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/8506434858363286425.png",
        slug: "zama",
        hidden: true,
      },
    ],
    projectContributorLabels: [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        slug: "string",
        name: "Core Contributor",
      },
    ],
    countryCode: "FR",
    totalRewardedUsdAmount: 0,
    rewardCount: 0,
    issueCount: 0,
    prCount: 0,
    codeReviewCount: 0,
    contributionCount: 0,
    bio: "Contributing to awesome open source projects.",
    signedUpOnGithubAt: "2024-10-09T09:32:45.903Z",
    signedUpAt: "2024-10-09T09:32:45.903Z",
    lastSeenAt: "2024-10-09T09:32:45.903Z",
    contacts: [
      {
        channel: "TELEGRAM",
        contact: "foobar@gmail.com",
        visibility: "public",
      },
    ],
    githubUserId: 595505,
    login: "ofux",
    avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
    isRegistered: true,
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    globalRank: 42,
    globalRankPercentile: 10,
    globalRankCategory: "A",
  },
];
const applicants: GetContributionByIdResponse["applicants"] = [
  {
    languages: [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        slug: "string",
        name: "Rust",
        logoUrl: "https://rust.org/logo.png",
        bannerUrl: "https://rust.org/banner.png",
      },
    ],
    ecosystems: [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "Ethereum Foundation",
        url: "https://ethereum.org",
        logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/8506434858363286425.png",
        bannerUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/8506434858363286425.png",
        slug: "zama",
        hidden: true,
      },
    ],
    projectContributorLabels: [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        slug: "string",
        name: "Core Contributor",
      },
    ],
    countryCode: "FR",
    totalRewardedUsdAmount: 0,
    rewardCount: 0,
    issueCount: 0,
    prCount: 0,
    codeReviewCount: 0,
    contributionCount: 0,
    bio: "Contributing to awesome open source projects.",
    signedUpOnGithubAt: "2024-10-09T09:32:45.903Z",
    signedUpAt: "2024-10-09T09:32:45.903Z",
    lastSeenAt: "2024-10-09T09:32:45.903Z",
    contacts: [
      {
        channel: "TELEGRAM",
        contact: "foobar@gmail.com",
        visibility: "public",
      },
    ],
    githubUserId: 595505,
    login: "ofux",
    avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
    isRegistered: true,
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    globalRank: 42,
    globalRankPercentile: 10,
    globalRankCategory: "A",
  },
];

const totalRewardedAmount: GetContributionByIdResponse["totalRewardedAmount"] = {
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
};

const linkedIssues: GetContributionByIdResponse["linkedIssues"] = [
  {
    githubId: 666,
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
    lastUpdatedAt: "2024-10-09T09:08:20.288Z",
  },
];

const languages: GetContributionByIdResponse["languages"] = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    slug: "string",
    name: "Rust",
    logoUrl: "https://rust.org/logo.png",
    bannerUrl: "https://rust.org/banner.png",
  },
];
const assignees: GetContributionByIdResponse["assignees"] = [
  {
    languages: [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        slug: "string",
        name: "Rust",
        logoUrl: "https://rust.org/logo.png",
        bannerUrl: "https://rust.org/banner.png",
      },
    ],
    ecosystems: [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "Ethereum Foundation",
        url: "https://ethereum.org",
        logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/8506434858363286425.png",
        bannerUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/8506434858363286425.png",
        slug: "zama",
        hidden: true,
      },
    ],
    projectContributorLabels: [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        slug: "string",
        name: "Core Contributor",
      },
    ],
    countryCode: "FR",
    totalRewardedUsdAmount: 0,
    rewardCount: 0,
    issueCount: 0,
    prCount: 0,
    codeReviewCount: 0,
    contributionCount: 0,
    bio: "Contributing to awesome open source projects.",
    signedUpOnGithubAt: "2024-10-09T09:32:45.903Z",
    signedUpAt: "2024-10-09T09:32:45.903Z",
    lastSeenAt: "2024-10-09T09:32:45.903Z",
    contacts: [
      {
        channel: "TELEGRAM",
        contact: "foobar@gmail.com",
        visibility: "public",
      },
    ],
    githubUserId: 595505,
    login: "ofux",
    avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
    isRegistered: true,
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    globalRank: 42,
    globalRankPercentile: 10,
    globalRankCategory: "A",
  },
];

const githubLabels: GetContributionByIdResponse["githubLabels"] = [
  {
    name: "GFI",
    description: "",
  },
  {
    name: "GFI2",
    description: "",
  },
  {
    name: "GFI3",
    description: "",
  },
];

const mockContribution: Record<string, GetContributionByIdResponse> = {
  "6af85286-2b4f-447c-a265-56ace336cce7": {
    type: "ISSUE",
    githubId: 55555,
    repo,
    githubAuthor,
    githubNumber: 1234,
    githubStatus: "OPEN",
    githubTitle: "Fix UI Bug on transaction history page",
    githubHtmlUrl: "",
    githubBody: "",
    githubLabels,
    lastUpdatedAt: "2024-10-07T08:10:44.062572229Z",
    id: "5dfe1418-6555-45e4-98e0-4d930ff5bf65",
    createdAt: "2024-10-07T08:10:44.062572229Z",
    completedAt: "2024-10-07T08:10:44.062572229Z",
    activityStatus: "NOT_ASSIGNED",
    project,
    contributors,
    applicants,
    assignees,
    languages,
    linkedIssues,
    totalRewardedAmount,
  },
  "caf85286-2b4f-447c-a265-56ace336cce7": {
    type: "ISSUE",
    repo,
    githubId: 55555,
    githubAuthor,
    githubNumber: 1234,
    githubStatus: "OPEN",
    githubTitle: "Fix UI Bug on transaction history page",
    githubHtmlUrl: "",
    githubBody: "",
    githubLabels,
    lastUpdatedAt: "2024-10-07T08:10:44.062572229Z",
    id: "5dfe1418-6555-45e4-98e0-4d930ff5bf65",
    createdAt: "2024-10-07T08:10:44.062572229Z",
    completedAt: "2024-10-07T08:10:44.062572229Z",
    activityStatus: "IN_PROGRESS",
    project,
    contributors,
    applicants,
    assignees,
    languages,
    linkedIssues,
    totalRewardedAmount,
  },
  "eaf85286-2b4f-447c-a265-56ace336cce7": {
    type: "PULL_REQUEST",
    repo,
    githubId: 55555,
    githubAuthor,
    githubNumber: 1234,
    githubStatus: "OPEN",
    githubTitle: "Fix UI Bug on transaction history page",
    githubHtmlUrl: "",
    githubBody: "",
    githubLabels,
    lastUpdatedAt: "2024-10-07T08:10:44.062572229Z",
    id: "5dfe1418-6555-45e4-98e0-4d930ff5bf65",
    createdAt: "2024-10-07T08:10:44.062572229Z",
    completedAt: "2024-10-07T08:10:44.062572229Z",
    activityStatus: "TO_REVIEW",
    project,
    contributors,
    applicants,
    assignees,
    languages,
    linkedIssues,
    totalRewardedAmount,
  },
  "1af85286-2b4f-447c-a265-56ace336cce7": {
    type: "PULL_REQUEST",
    repo,
    githubId: 55555,
    githubAuthor,
    githubNumber: 1234,
    githubStatus: "MERGED",
    githubTitle: "Fix UI Bug on transaction history page",
    githubHtmlUrl: "",
    githubBody: "",
    githubLabels,
    lastUpdatedAt: "2024-10-07T08:10:44.062572229Z",
    id: "5dfe1418-6555-45e4-98e0-4d930ff5bf65",
    createdAt: "2024-10-07T08:10:44.062572229Z",
    completedAt: "2024-10-07T08:10:44.062572229Z",
    activityStatus: "DONE",
    project,
    contributors,
    applicants,
    assignees,
    languages,
    linkedIssues,
    totalRewardedAmount,
  },
  "64f85286-2b4f-447c-a265-56ace336cce7": {
    type: "PULL_REQUEST",
    repo,
    githubId: 55555,
    githubAuthor,
    githubNumber: 1234,
    githubStatus: "CLOSED",
    githubTitle: "Fix UI Bug on transaction history page",
    githubHtmlUrl: "",
    githubBody: "",
    githubLabels,
    lastUpdatedAt: "2024-10-07T08:10:44.062572229Z",
    id: "5dfe1418-6555-45e4-98e0-4d930ff5bf65",
    createdAt: "2024-10-07T08:10:44.062572229Z",
    completedAt: "2024-10-07T08:10:44.062572229Z",
    activityStatus: "ARCHIVED",
    project,
    contributors,
    applicants,
    assignees,
    languages,
    linkedIssues,
    totalRewardedAmount,
  },
};
export class ContributionClientAdapter implements ContributionStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getContributions: "contributions",
    getContributionById: "contributions/:contributionId",
    getContributionEvent: "contributions/:contributionId/events",
  } as const;

  getContributions = ({ queryParams }: FirstParameter<ContributionStoragePort["getContributions"]>) => {
    const path = this.routes["getContributions"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () => {
      const data = await this.client.request<GetContributionsResponse>({
        path,
        method,
        tag,
        queryParams,
      });

      return {
        ...data,
        contributions: data.contributions.map(contribution => new ContributionActivity(contribution)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getContributionsById = ({
    queryParams,
    pathParams,
  }: FirstParameter<ContributionStoragePort["getContributionsById"]>) => {
    const path = this.routes["getContributionById"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetContributionByIdResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      console.log("ICICI", pathParams?.contributionId);
      if (pathParams?.contributionId && mockContribution[pathParams?.contributionId]) {
        return new ContributionActivity(mockContribution[pathParams?.contributionId]);
      }

      return new ContributionActivity(data);
    };

    return {
      request,
      tag,
    };
  };

  getContributionEvent = ({
    queryParams,
    pathParams,
  }: FirstParameter<ContributionStoragePort["getContributionEvent"]>) => {
    const path = this.routes["getContributionEvent"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetContributionEventsResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return data?.events.map(event => new ContributionEvent(event)) ?? [];
    };

    return {
      request,
      tag,
    };
  };
}
