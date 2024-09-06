import { Meta, StoryObj } from "@storybook/react";

import * as TabItemStories from "../tab-item/tab-item.stories";
import { TabsPort } from "./tabs.types";
import { Tabs } from "./variants/tabs-default";

type Story = StoryObj<typeof Tabs>;

const defaultProps: TabsPort = {
  selectedId: "1",
  tabs: [
    {
      children: "Placeholder",
      id: "1",
    },
    {
      children: "Placeholder",
      id: "2",
    },
    {
      children: "Placeholder",
      id: "3",
    },
    {
      children: "Placeholder",
      id: "4",
    },
    {
      children: "Placeholder",
      id: "5",
    },
    {
      children: "Placeholder",
      id: "6",
    },
  ],
};

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: "Molecules/Tabs",
  tags: ["autodocs"],
};

function TabsTemplate(args: TabsPort) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Tabs {...defaultProps} {...args} />
      <Tabs {...defaultProps} {...args} size={"md"} />
    </div>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Tabs />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col gap-6">
        <Tabs {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Horizontal: Story = {
  parameters: {
    docs: {
      source: { code: "<Tabs />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col gap-6">
        <TabsTemplate {...args} />
        <TabsTemplate {...args} variant={"brand"} />
        <TabsTemplate {...args} variant={"solid"} />
        <TabsTemplate {...args} variant={"underline"} />
      </div>
    );
  },
};

export const HorizontalFullWidth: Story = {
  parameters: {
    docs: {
      source: { code: "<Tabs />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col gap-6">
        <TabsTemplate {...args} isFullWidth={true} />
        <TabsTemplate {...args} isFullWidth={true} variant={"brand"} />
        <TabsTemplate {...args} isFullWidth={true} variant={"solid"} />
        <TabsTemplate {...args} isFullWidth={true} variant={"underline"} />
      </div>
    );
  },
};

export const Vertical: Story = {
  parameters: {
    docs: {
      source: { code: "<Tabs />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-row gap-6">
        <TabsTemplate {...args} layout={"vertical"} />
        <TabsTemplate {...args} layout={"vertical"} variant={"brand"} />
        <TabsTemplate {...args} layout={"vertical"} variant={"solid"} />
        <TabsTemplate {...args} layout={"vertical"} variant={"underline"} />
      </div>
    );
  },
};

export const Item = TabItemStories.Variants;

export default meta;
