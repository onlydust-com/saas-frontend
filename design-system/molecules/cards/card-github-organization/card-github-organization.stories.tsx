import { Meta, StoryObj } from "@storybook/react";
import { Github } from "lucide-react";

import { CardGithubOrganizationPort } from "./card-github-organization.types";
import { CardGithubOrganization } from "./variants/card-github-organization-default";

type Story = StoryObj<typeof CardGithubOrganization>;

const defaultProps: CardGithubOrganizationPort<"div"> = {
  name: "Onlydust Onlydust Onlydust Onlydust Onlydust Onlydust Onlydust Onlydust Onlydust Onlydust Onlydust Onlydust Onlydust Onlydust Onlydust Onlydust",
  avatar: { src: "" },
  action: { children: "Manage", startIcon: { component: Github } },
};

const meta: Meta<typeof CardGithubOrganization> = {
  component: CardGithubOrganization,
  title: "Molecules/Cards/GithubOrganization",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<CardGithubOrganization />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardGithubOrganization {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
