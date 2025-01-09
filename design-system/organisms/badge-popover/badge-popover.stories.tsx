import { Meta, StoryObj } from "@storybook/react";
import { CircleDashed } from "lucide-react";

import { BadgePopoverPort } from "./badge-popover.types";
import { BadgePopover } from "./variants/badge-popover-default";

type Story = StoryObj<typeof BadgePopover>;

const defaultProps: BadgePopoverPort<"div"> = {
  title: "Badge Popover",
  count: 10,
  content: "1 popover",
  items: [
    {
      content: "item 1",
      onSelect: () => {},
      isSelected: false,
    },
    {
      content: () => <div>item 2</div>,
      onSelect: () => {},
      isSelected: false,
    },
    {
      content: "item 3",
      onSelect: () => {},
      isSelected: false,
    },
    {
      content: "item 4",
      onSelect: () => {},
      isSelected: false,
    },
    {
      content: "item 5",
      onSelect: () => {},
      isSelected: false,
    },
    {
      content: "item 6",
      onSelect: () => {},
      isSelected: false,
    },
    {
      content: "item 7",
      onSelect: () => {},
      isSelected: false,
    },
    {
      content: "item 4",
      onSelect: () => {},
      isSelected: false,
    },
    {
      content: "item 5",
      onSelect: () => {},
      isSelected: false,
    },
    {
      content: "item 6",
      onSelect: () => {},
      isSelected: false,
    },
    {
      content: "item 7",
      onSelect: () => {},
      isSelected: false,
    },
    {
      content: "item 4",
      onSelect: () => {},
      isSelected: false,
    },
    {
      content: "item 5",
      onSelect: () => {},
      isSelected: false,
    },
    {
      content: "item 6",
      onSelect: () => {},
      isSelected: false,
    },
    {
      content: "item 7",
      onSelect: () => {},
      isSelected: false,
    },
    {
      content: "item 4",
      onSelect: () => {},
      isSelected: false,
    },
    {
      content: "item 5",
      onSelect: () => {},
      isSelected: false,
    },
    {
      content: "item 6",
      onSelect: () => {},
      isSelected: false,
    },
    {
      content: "item 7",
      onSelect: () => {},
      isSelected: false,
    },
  ],
  icon: {
    component: CircleDashed,
    color: "blue",
  },
};

const meta: Meta<typeof BadgePopover> = {
  component: BadgePopover,
  title: "Organisms/BadgePopover",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<BadgePopover />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <BadgePopover {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
