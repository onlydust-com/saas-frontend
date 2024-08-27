import { Meta, StoryObj } from "@storybook/react";

import { PaperLoading } from "./paper.loading";
import { PaperPort } from "./paper.types";
import { Paper } from "./variants/paper-default";

type Story = StoryObj<typeof Paper>;

const defaultProps: PaperPort<"div"> = {};

const meta: Meta<typeof Paper> = {
  component: Paper,
  title: "Deprecated/Atoms/Paper",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Paper size='l' />" },
    },
    backgrounds: {
      default: "default",
      values: [{ name: "default", value: "var(--background-secondary)" }],
    },
  },
  render: args => {
    return (
      <div className="grid gap-2">
        <Paper {...defaultProps} {...args}>
          Paper l
        </Paper>
      </div>
    );
  },
};

export const Skeleton: Story = {
  render: () => {
    return <PaperLoading classNames={{ base: "w-full h-[200px]" }} />;
  },
};

export default meta;
