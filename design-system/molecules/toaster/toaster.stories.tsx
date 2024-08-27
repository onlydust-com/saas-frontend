import { Meta, StoryObj } from "@storybook/react";

import { ToasterPort } from "./toaster.types";
import { Toaster } from "./variants/toaster-default";

type Story = StoryObj<typeof Toaster>;

const defaultProps: ToasterPort<"div"> = {};

const meta: Meta<typeof Toaster> = {
  component: Toaster,
  title: "Molecules/Toaster",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Toaster />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Toaster {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
