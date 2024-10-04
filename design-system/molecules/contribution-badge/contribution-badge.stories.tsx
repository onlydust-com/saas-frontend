import { Meta, StoryObj } from "@storybook/react";

import { ContributionBadgePort } from "./contribution-badge.types";
import { ContributionBadge } from "./variants/contribution-badge-default";

type Story = StoryObj<typeof ContributionBadge>;

const defaultProps: ContributionBadgePort<"div"> = {
  type: "ISSUE",
  githubStatus: "OPEN",
  id: 123,
};

const meta: Meta<typeof ContributionBadge> = {
  component: ContributionBadge,
  title: "Molecules/ContributionBadge",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<ContributionBadge />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <ContributionBadge {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
