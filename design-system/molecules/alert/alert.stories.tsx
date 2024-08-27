import { Meta, StoryObj } from "@storybook/react";

import { AlertPort } from "./alert.types";
import { Alert } from "./variants/alert-default";

type Story = StoryObj<typeof Alert>;

const defaultProps: AlertPort = {};

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: "Molecules/Alert",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Alert />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Alert {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
