import { Meta, StoryObj } from "@storybook/react";
import { CircleDashed } from "lucide-react";

import { TabItemPort } from "./tab-item.types";
import { TabItem } from "./variants/tab-item-default";

type Story = StoryObj<typeof TabItem>;

const defaultProps: TabItemPort = {
  children: "Placeholder",
  startIcon: { component: CircleDashed },
  badge: { children: 3 },
  id: "",
};

const meta: Meta<typeof TabItem> = {
  component: TabItem,
  title: "Molecules/Tabs/TabItem",
  tags: ["autodocs"],
};

function TabItemTemplate({ hover, focus, ...args }: Omit<TabItemPort, "id"> & { hover?: boolean; focus?: boolean }) {
  if (hover) {
    return <TabItem {...defaultProps} {...args} attr={{ "data-hover": true }} />;
  }

  if (focus) {
    return <TabItem {...defaultProps} {...args} attr={{ "data-focus": true }} />;
  }

  return <TabItem {...defaultProps} {...args} />;
}

function TabsVariant({ ...args }: Omit<TabItemPort, "id">) {
  return (
    <div className="flex w-full gap-5">
      <div className="flex w-full gap-2">
        <div className="flex w-full flex-col gap-2">
          <TabItemTemplate {...args} />
          <TabItemTemplate {...args} hover />
          <TabItemTemplate {...args} focus />
        </div>
        <div className="flex w-full flex-col gap-2">
          <TabItemTemplate {...args} isSelected={true} />
          <TabItemTemplate {...args} isSelected={true} hover />
          <TabItemTemplate {...args} isSelected={true} focus />
        </div>
      </div>
      <div className="flex w-full gap-2">
        <div className="flex w-full flex-col gap-2">
          <TabItemTemplate {...args} size={"md"} />
          <TabItemTemplate {...args} size={"md"} hover />
          <TabItemTemplate {...args} size={"md"} focus />
        </div>
        <div className="flex w-full flex-col gap-2">
          <TabItemTemplate {...args} size={"md"} isSelected={true} />
          <TabItemTemplate {...args} size={"md"} isSelected={true} hover />
          <TabItemTemplate {...args} size={"md"} isSelected={true} focus />
        </div>
      </div>
    </div>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<TabItem />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-start gap-2">
        <TabItemTemplate {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Variants: Story = {
  parameters: {
    docs: {
      source: { code: "<TabItem />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full flex-col gap-6">
        <TabsVariant />
        <TabsVariant variant={"brand"} />
        <TabsVariant variant={"solid"} />
        <TabsVariant variant={"underline"} />
      </div>
    );
  },
};

export const Badge: Story = {
  parameters: {
    docs: {
      source: { code: "<TabItem />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full flex-col gap-6">
        <TabsVariant badge={undefined} startIcon={undefined} />
        <TabsVariant startIcon={undefined} />
      </div>
    );
  },
};

export const Icon: Story = {
  parameters: {
    docs: {
      source: { code: "<TabItem />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full flex-col gap-6">
        <TabsVariant badge={undefined} startIcon={undefined} />
        <TabsVariant badge={undefined} />
      </div>
    );
  },
};

export default meta;
