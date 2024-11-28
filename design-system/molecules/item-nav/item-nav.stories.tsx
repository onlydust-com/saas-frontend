import { Meta, StoryObj } from "@storybook/react";
import { House } from "lucide-react";

import { ItemNavPort } from "./item-nav.types";
import { ItemNav } from "./variants/item-nav-default";

type Story = StoryObj<typeof ItemNav>;

const defaultProps: ItemNavPort = {
  linkProps: {
    href: "https://www.google.com",
  },
  iconProps: { component: House },
  children: "Item Nav",
  isDisabled: false,
};

const meta: Meta<typeof ItemNav> = {
  component: ItemNav,
  title: "Deprecated/Molecules/ItemNav",
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
      <div className="flex w-[236px]">
        <ItemNav {...defaultProps} {...args} />
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
      <div className="flex w-[236px]">
        <ItemNav {...defaultProps} isDisabled />
      </div>
    );
  },
};

export default meta;
