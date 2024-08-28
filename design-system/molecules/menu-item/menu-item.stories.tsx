import { Meta, StoryObj } from "@storybook/react";

import { MenuItemPort } from "./menu-item.types";
import { MenuItem } from "./variants/menu-item-default";

type Story = StoryObj<typeof MenuItem>;

const defaultProps: MenuItemPort = {
  label: "Item 1",
  id: "item1",
};

const meta: Meta<typeof MenuItem> = {
  component: MenuItem,
  title: "Molecules/MenuItem",
  tags: ["autodocs"],
};

function MenuItemTemplate(args: MenuItemPort) {
  return <MenuItem {...defaultProps} {...args} classNames={{ base: "max-w-[192px] w-[192px]" }} />;
}

function MenuItemAvatarTemplate(args: MenuItemPort) {
  return <MenuItemTemplate {...args} avatar={{ src: "" }} />;
}

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<MenuItem />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <MenuItemTemplate {...args} />
      </div>
    );
  },
};

export const Base: Story = {
  parameters: {
    docs: {
      source: { code: "<MenuItem />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full gap-5">
        <div className="flex w-full flex-col gap-2">
          <MenuItemTemplate {...args} />
          <MenuItemTemplate {...args} attr={{ "data-hover": true }} />
          <MenuItemTemplate {...args} isDisabled />
        </div>
        <div className="flex w-full flex-col gap-2">
          <MenuItemTemplate {...args} isSelected={true} />
          <MenuItemTemplate {...args} isSelected={true} attr={{ "data-hover": true }} />
          <MenuItemTemplate {...args} isSelected={true} isDisabled />
        </div>
      </div>
    );
  },
};

export const Avatar: Story = {
  parameters: {
    docs: {
      source: { code: "<MenuItem />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col gap-2">
        <MenuItemAvatarTemplate {...args} />
        <MenuItemAvatarTemplate {...args} attr={{ "data-hover": true }} />
        <MenuItemAvatarTemplate {...args} isDisabled />
      </div>
    );
  },
};

export default meta;
