import { Meta, StoryObj } from "@storybook/react";
import { CircleDashed } from "lucide-react";

import { Paper } from "@/design-system/atoms/paper";

import { TimelinePort } from "./timeline.types";
import { Timeline } from "./variants/timeline-default";

type Story = StoryObj<typeof Timeline>;

const defaultProps: TimelinePort<"div"> = {
  items: [
    {
      label: "Paid",
      icon: { component: CircleDashed },
      endContent: "12 Sept. 2024",
    },
    {
      label: "Paid",
      icon: { component: CircleDashed },
      endContent: "12 Sept. 2024",
      color: "warning",
      children: <Paper background={"primary"}>Children</Paper>,
    },
    {
      label: "Paid",
      icon: { component: CircleDashed },
      endContent: "12 Sept. 2024",
      color: "success",
    },
  ],
};

const meta: Meta<typeof Timeline> = {
  component: Timeline,
  title: "Organisms/Timeline",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Timeline />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Timeline {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
