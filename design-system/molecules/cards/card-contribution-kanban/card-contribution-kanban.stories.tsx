import { Meta, StoryObj } from "@storybook/react";

import { CardContributionKanbanPort } from "@/design-system/molecules/cards/card-contribution-kanban/card-contribution-kanban.types";
import { CardContributionKanban } from "@/design-system/molecules/cards/card-contribution-kanban/variants/card-contribution-kanban-default";

type Story = StoryObj<typeof CardContributionKanban>;

const defaultProps: CardContributionKanbanPort<"div"> = {
  contribution: {
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
    ],
    applicants: [
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
    ],
  },
};

const meta: Meta<typeof CardContributionKanban> = {
  component: CardContributionKanban,
  title: "Molecules/CardContributionKanban",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<CardContributionKanban />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardContributionKanban {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
