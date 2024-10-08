import { Meta, StoryObj } from "@storybook/react";

import { CardContributionKanbanPort } from "@/design-system/molecules/cards/card-contribution-kanban/card-contribution-kanban.types";
import { CardContributionKanban } from "@/design-system/molecules/cards/card-contribution-kanban/variants/card-contribution-kanban-default";

type Story = StoryObj<typeof CardContributionKanban>;

const defaultProps: CardContributionKanbanPort<"div"> = {
  type: "ISSUE",
  githubTitle: "Contribution title",
  githubStatus: "OPEN",
  githubNumber: "123",
  lastUpdatedAt: "2024-10-04T12:45:02.234Z",
  rewardUsdAmount: 123,
  applicants: [
    {
      login: "ofux",
      avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
    },
  ],
  contributors: [
    {
      login: "ofux",
      avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
    },
  ],
  linkedIssues: [
    {
      type: "ISSUE",
      githubTitle: "string",
      githubStatus: "OPEN",
      githubNumber: 6,
    },
  ],
  githubLabels: [{ name: "Label" }],
};

const meta: Meta<typeof CardContributionKanban> = {
  component: CardContributionKanban,
  title: "Molecules/Cards/CardContributionKanban",
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
