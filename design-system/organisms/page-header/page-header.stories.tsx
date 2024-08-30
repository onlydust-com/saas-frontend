import { Meta, StoryObj } from "@storybook/react";

import { PageHeaderPort } from "./page-header.types";
import { PageHeader } from "./variants/page-header-default";

type Story = StoryObj<typeof PageHeader>;

const defaultProps: PageHeaderPort<"div"> = {};

const meta: Meta<typeof PageHeader> = {
  component: PageHeader,
  title: "Organisms/PageHeader",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<PageHeader />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <PageHeader {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
