import { Meta, StoryObj } from "@storybook/react";

import { Typo } from "@/design-system/atoms/typo";

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
  },
  render: args => {
    return (
      <div className="grid gap-2">
        <Paper {...defaultProps} {...args} size={"l"}>
          Paper l
        </Paper>
        <Paper {...defaultProps} {...args}>
          Paper m (default)
        </Paper>
        <Paper {...defaultProps} {...args} size={"s"}>
          Paper s
        </Paper>
      </div>
    );
  },
};

export const Containers: Story = {
  parameters: {
    docs: {
      source: { code: "<Paper container='2' />" },
    },
  },
  render: args => {
    return (
      <div className="grid gap-2">
        <Paper {...defaultProps} {...args}>
          Container 1
        </Paper>
        <Paper {...defaultProps} {...args} container={"2"}>
          Container 2
        </Paper>
        <Paper {...defaultProps} {...args} container={"3"}>
          Container 3
        </Paper>
        <Paper {...defaultProps} {...args} container={"4"}>
          Container 4
        </Paper>
        <Paper {...defaultProps} {...args} container={"action"}>
          Container action
        </Paper>
        <Paper {...defaultProps} {...args} container={"inverse"}>
          <Typo classNames={{ base: "text-text-4" }}>Container inverse</Typo>
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
