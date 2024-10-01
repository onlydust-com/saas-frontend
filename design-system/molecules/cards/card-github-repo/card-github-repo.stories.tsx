import { Meta, StoryObj } from "@storybook/react";
import { CircleDashed, Trash } from "lucide-react";

import { CardGithubRepoPort } from "./card-github-repo.types";
import { CardGithubRepo } from "./variants/card-github-repo-default";

type Story = StoryObj<typeof CardGithubRepo>;

const defaultProps: CardGithubRepoPort<"div"> = {
  name: "CardGithubRepo",
  description: "This is a CardGithubRepo component",
  topActions: {
    iconOnly: true,
    startIcon: { component: Trash },
  },
  starsCount: 10,
  prCount: 5,
  badges: [
    {
      icon: { component: CircleDashed },
      children: "Custom Badge",
    },
  ],
};

const meta: Meta<typeof CardGithubRepo> = {
  component: CardGithubRepo,
  title: "Molecules/Cards/GithubRepo",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<CardGithubRepo />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardGithubRepo {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
