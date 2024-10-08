import { Meta, StoryObj } from "@storybook/react";

import { ContributionInlinePort } from "./contribution-inline.types";
import { ContributionInline } from "./variants/contribution-inline-default";

type Story = StoryObj<typeof ContributionInline>;

const defaultProps: ContributionInlinePort<"div"> = {
  contributionBadgeProps: {
    type: "ISSUE",
    githubStatus: "OPEN",
    number: 123,
  },
  githubTitle: "Title",
};

const meta: Meta<typeof ContributionInline> = {
  component: ContributionInline,
  title: "Molecules/ContributionInline",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<ContributionInline />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <ContributionInline {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
