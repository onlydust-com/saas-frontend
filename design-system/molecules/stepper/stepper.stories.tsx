import { Meta, StoryObj } from "@storybook/react";

import { StepperLoading } from "./stepper.loading";
import { StepperPort } from "./stepper.types";
import { Stepper } from "./variants/stepper-default";

type Story = StoryObj<typeof Stepper>;

const defaultProps: StepperPort = {
  steps: [{ value: 100 }, { value: 100 }, { value: 0 }, { value: 0 }],
};

const meta: Meta<typeof Stepper> = {
  component: Stepper,
  title: "Molecules/Stepper",
  tags: ["autodocs"],
};

export const Default: Story = {
  args: {
    ...defaultProps,
  },
  parameters: {
    docs: {
      source: { code: "<Stepper />" },
    },
  },
  render: args => {
    return (
      <div className="w-[300px]">
        <Stepper {...args} />
      </div>
    );
  },
};

export const Loading: Story = {
  parameters: {
    docs: {
      source: { code: "<StepperLoading />" },
    },
  },
  render: () => {
    return (
      <div className="w-[300px]">
        <StepperLoading />
      </div>
    );
  },
};

export default meta;
