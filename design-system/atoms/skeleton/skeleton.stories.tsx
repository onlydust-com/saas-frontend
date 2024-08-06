import { Meta, StoryObj } from "@storybook/react";

import { SkeletonPort } from "./skeleton.types";
import { Skeleton } from "./variants/skeleton-default";

type Story = StoryObj<typeof Skeleton>;

const defaultProps: SkeletonPort = {
  classNames: {
    base: "w-20 h-20",
  },
};

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  title: "Atoms/Skeleton",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#fff" }],
    },
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Skeleton />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Skeleton {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
