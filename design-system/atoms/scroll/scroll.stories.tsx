import { Meta, StoryObj } from "@storybook/react";

import { ScrollPort } from "./scroll.types";
import { Scroll } from "./variants/scroll-default";

type Story = StoryObj<typeof Scroll>;

const defaultProps: ScrollPort = {};

const meta: Meta<typeof Scroll> = {
  component: Scroll,
  title: "Atoms/Scroll",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Scroll />" },
    },
  },
  render: args => {
    return (
      <div className="flex h-96 w-full items-center gap-2">
        <Scroll {...defaultProps} {...args}>
          <div className="h-[2000px] w-full bg-background-brand-primary"></div>
        </Scroll>
      </div>
    );
  },
};

export default meta;
