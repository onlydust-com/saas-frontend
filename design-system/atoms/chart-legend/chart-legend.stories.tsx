import { Meta, StoryObj } from "@storybook/react";

import { ChartLegendPort } from "./chart-legend.types";
import { ChartLegend } from "./variants/chart-legend-default";

type Story = StoryObj<typeof ChartLegend>;

const defaultProps: ChartLegendPort<"div"> = {
  size: "m",
  color: "primary",
  children: "Legend Label",
};

const meta: Meta<typeof ChartLegend> = {
  component: ChartLegend,
  title: "Deprecated/Atoms/ChartLegend",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#05051E" }],
    },
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<ChartLegend />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <ChartLegend {...defaultProps} {...args} color={"primary"} />
        <ChartLegend {...defaultProps} {...args} color={"secondary"} />
        <ChartLegend {...defaultProps} {...args} color={"tertiary"} />
      </div>
    );
  },
};

export default meta;
