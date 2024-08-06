import { Meta, StoryObj } from "@storybook/react";

import { IconPort } from "./icon.types";
import { Icon } from "./variants/icon-default";

type Story = StoryObj<typeof Icon>;

const defaultProps: IconPort = {
  name: "ri-fire-line",
};

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: "Atoms/Icon",
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
      source: { code: "<Icon />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Icon {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
