import { Meta, StoryObj } from "@storybook/react";

import { CardIssuePort } from "./card-issue.types";
import { CardIssue } from "./variants/card-issue-default";

type Story = StoryObj<typeof CardIssue>;

const defaultProps: CardIssuePort<"div"> = {};

const meta: Meta<typeof CardIssue> = {
  component: CardIssue,
  title: "Molecules/CardIssue",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<CardIssue />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardIssue {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
