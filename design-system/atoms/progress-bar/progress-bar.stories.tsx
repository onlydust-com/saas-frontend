import { Meta, StoryObj } from "@storybook/react";

import { ProgressBarLoading } from "./progress-bar.loading";
import { ProgressBarPort } from "./progress-bar.types";
import { ProgressBar } from "./variants/progress-bar-default";

type Story = StoryObj<typeof ProgressBar>;

const defaultProps: ProgressBarPort = {
  min: 0,
  max: 100,
  value: 50,
};

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  title: "Atoms/ProgressBar",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<ProgressBar />" },
    },
  },
  render: args => {
    return (
      <div className="w-[300px]">
        <ProgressBar {...defaultProps} {...args} />
      </div>
    );
  },
};

export const WithMinAndMax: Story = {
  args: {
    min: 0,
    max: 200,
    value: 150,
  },
  parameters: {
    docs: {
      source: { code: "<ProgressBar min={0} max={200} value={150} />" },
    },
  },
  render: args => {
    return (
      <div className="w-[300px]">
        <ProgressBar {...args} />
      </div>
    );
  },
};

export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<ProgressBarLoading />" },
    },
  },
  render: () => {
    return (
      <div className="w-[300px]">
        <ProgressBarLoading />
      </div>
    );
  },
};

export default meta;
