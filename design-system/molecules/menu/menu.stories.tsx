import { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { MenuPort } from "./menu.types";
import { Menu } from "./variants/menu-default";

type Story = StoryObj<typeof Menu>;

const defaultProps: MenuPort = {
  children: <Button>Open menu</Button>,
  items: [
    { id: "item1", label: "Item 1" },
    { id: "item2", label: "Item 2" },
    { id: "item3", label: "Item 3" },
    { id: "item4", label: "Item 4" },
    { id: "item5", label: "Item 5" },
    { id: "item6", label: "Item 6" },
    { id: "item7", label: "Item 7" },
    { id: "item8", label: "Item 8" },
    { id: "item9", label: "Item 9" },
    { id: "item10", label: "Item 10" },
    { id: "item11", label: "Item 11" },
    { id: "item12", label: "Item 12" },
    { id: "item13", label: "Item 13" },
    { id: "item14", label: "Item 14" },
    { id: "item15", label: "Item 15" },
    { id: "item16", label: "Item 16" },
    { id: "item17", label: "Item 17" },
    { id: "item18", label: "Item 18" },
    { id: "item19", label: "Item 19" },
    { id: "item20", label: "Item 20" },
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
