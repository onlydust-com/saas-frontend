import { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { TooltipPort } from "./tooltip.types";
import { Tooltip } from "./variants/tooltip-default";

type Story = StoryObj<typeof Tooltip>;

const defaultProps: TooltipPort<"div"> = {
  title: "Tooltip title",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
};

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: "Atoms/Tooltip",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Tooltip />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Tooltip {...defaultProps} {...args}>
          <Button isDisabled>Show tooltip</Button>
        </Tooltip>
      </div>
    );
  },
};

export const BackgroundPrimary: Story = {
  parameters: {
    docs: {
      source: { code: "<Tooltip />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Tooltip {...defaultProps} {...args} background={"primary"}>
          <Button isDisabled>Show tooltip</Button>
        </Tooltip>
      </div>
    );
  },
};

export default meta;
