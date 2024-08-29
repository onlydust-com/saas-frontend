import { Meta, StoryObj } from "@storybook/react";

import { TabsPort } from "./tabs.types";
import { Tabs } from "./variants/tabs-default";

type Story = StoryObj<typeof Tabs>;

const defaultProps: TabsPort<"div"> = {};

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: "Molecules/Tabs",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Tabs />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Tabs {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
