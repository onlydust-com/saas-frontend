import { Meta, StoryObj } from "@storybook/react";

import { ItemNavPort } from "@/design-system/molecules/item-nav/item-nav.types";
import { ItemNav } from "@/design-system/molecules/item-nav/variants/item-nav-default";

type Story = StoryObj<typeof ItemNav>;

const defaultProps: ItemNavPort = {
  href: "/test",
  icon: {
    name: "ri-home-4-line",
  },
  children: "Item Nav",
  isDisabled: false,
  isFolded: false,
};

const meta: Meta<typeof ItemNav> = {
  component: ItemNav,
  title: "Molecules/ItemNav",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#05051E" }],
    },
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<ItemNav />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <ItemNav {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Active: Story = {
  parameters: {
    docs: {
      source: { code: "<ItemNav />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full">
        <ItemNav {...defaultProps} isDisabled={false} />
      </div>
    );
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: { code: "<ItemNav isDisabled />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full">
        <ItemNav {...defaultProps} isDisabled />
      </div>
    );
  },
};

export const Folded: Story = {
  parameters: {
    docs: {
      source: { code: "<ItemNav isFolded />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full">
        <ItemNav {...defaultProps} isFolded />
      </div>
    );
  },
};

export default meta;
