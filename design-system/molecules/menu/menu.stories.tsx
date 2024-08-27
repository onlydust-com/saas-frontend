import { Meta, StoryObj } from "@storybook/react";

import { MenuPort } from "./menu.types";
import { Menu } from "./variants/menu-default";

type Story = StoryObj<typeof Menu>;

const defaultProps: MenuPort<"div"> = {};

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
