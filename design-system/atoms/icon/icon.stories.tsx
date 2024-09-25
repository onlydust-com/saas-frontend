import { Meta, StoryObj } from "@storybook/react";
import { Flame } from "lucide-react";

import { IconPort } from "./icon.types";
import { Icon } from "./variants/icon-default";

type Story = StoryObj<typeof Icon>;

const defaultProps: IconPort = {
  component: Flame,
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
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <Icon {...defaultProps} />
      </div>
    );
  },
};

export default meta;
