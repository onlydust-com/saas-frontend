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
      content: "coucou",
      onSelect: () => {},
      isSelected: false,
    },
    {
      content: () => <div>coucou</div>,
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
