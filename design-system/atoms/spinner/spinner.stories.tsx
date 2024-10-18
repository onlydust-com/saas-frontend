import { Meta, StoryObj } from "@storybook/react";

import { SpinnerPort } from "./spinner.types";
import { Spinner } from "./variants/spinner-default";

type Story = StoryObj<typeof Spinner>;

const defaultProps: SpinnerPort = {};

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  title: "Atoms/Spinner",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Spinner />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Spinner {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
