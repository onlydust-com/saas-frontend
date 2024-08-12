import { Meta, StoryObj } from "@storybook/react";

import { TableKpiPort } from "./table-kpi.types";
import { TableKpi } from "./variants/table-kpi-default";

type Story = StoryObj<typeof TableKpi>;

const defaultProps: TableKpiPort = {
  children: "123",
};

const meta: Meta<typeof TableKpi> = {
  component: TableKpi,
  title: "Atoms/TableKpi",
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
      source: { code: "<TableKpi />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <TableKpi {...defaultProps} {...args} state={"positive"} />
        <TableKpi {...defaultProps} {...args} state={"negative"} />
      </div>
    );
  },
};

export default meta;
