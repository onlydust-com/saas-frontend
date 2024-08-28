import { Meta, StoryObj } from "@storybook/react";
import { CircleDashed } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { MenuPort } from "./menu.types";
import { Menu } from "./variants/menu-default";

type Story = StoryObj<typeof Menu>;

const defaultProps: MenuPort = {
  children: <Button>Open menu</Button>,
  selectedIds: ["item2"],
  items: [
    { id: "item1", label: "Item 1" },
    { id: "item2", label: "Item 2", icon: { component: CircleDashed } },
    { id: "item3", label: "Item 3", avatar: { src: "" } },
    { id: "item4", label: "Item 4", isCheckbox: true },
    { id: "item5", label: "Item 4", isRadio: true },
    { id: "item6", label: "Item 6" },
    { id: "item7", label: "Item 7" },
    { id: "item8", label: "Item 8" },
    { id: "item9", label: "Item 9" },
  ],
};

const meta: Meta<typeof Menu> = {
  component: Menu,
  title: "Molecules/Menu",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Menu />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Menu {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
