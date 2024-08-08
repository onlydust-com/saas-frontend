import { Meta, StoryObj } from "@storybook/react";

import { ItemNavPort } from "./item-nav.types";
import { ItemNav } from "./variants/item-nav-default";

type Story = StoryObj<typeof ItemNav>;

const defaultProps: ItemNavPort<"div"> = {};

const meta: Meta<typeof ItemNav> = {
  component: ItemNav,
  title: "Atoms/ItemNav",
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

export default meta;
