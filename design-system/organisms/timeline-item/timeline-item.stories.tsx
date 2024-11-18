import { Meta, StoryObj } from "@storybook/react";
import { CircleDashed } from "lucide-react";

import { Paper } from "@/design-system/atoms/paper";

import { TimelineItemPort } from "./timeline-item.types";
import { TimelineItem } from "./variants/timeline-item-default";

type Story = StoryObj<typeof TimelineItem>;

const defaultProps: TimelineItemPort<"div"> = {
  label: "Paid",
  icon: { component: CircleDashed },
  endContent: "12 Sept. 2024",
};

const meta: Meta<typeof TimelineItem> = {
  component: TimelineItem,
  title: "Organisms/TimelineItem",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<TimelineItem />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <TimelineItem {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Children: Story = {
  parameters: {
    docs: {
      source: { code: "<TimelineItem />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <TimelineItem {...defaultProps} {...args}>
          <Paper background={"primary"}>Children</Paper>
        </TimelineItem>
      </div>
    );
  },
};

export const Colors: Story = {
  parameters: {
    docs: {
      source: { code: "<TimelineItem />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        <TimelineItem {...defaultProps} {...args} />
        <TimelineItem {...defaultProps} {...args} color={"warning"} />
        <TimelineItem {...defaultProps} {...args} color={"success"} />
        <TimelineItem {...defaultProps} {...args} color={"error"} />
        <TimelineItem {...defaultProps} {...args} color={"grey"} />
      </div>
    );
  },
};

export default meta;
