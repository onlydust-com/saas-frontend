import { Meta, StoryObj } from "@storybook/react";

import { ChartLegendPort } from "./chart-legend.types";
import { ChartLegend } from "./variants/chart-legend-default";

type Story = StoryObj<typeof ChartLegend>;

const defaultProps: ChartLegendPort<"div"> = {
  size: "m",
  colors: "brand-4",
  children: "Legend Label",
};

const meta: Meta<typeof ChartLegend> = {
  component: ChartLegend,
  title: "Atoms/ChartLegend",
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
        <ChartLegend {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
