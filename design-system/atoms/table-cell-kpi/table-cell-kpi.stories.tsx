import { Meta, StoryObj } from "@storybook/react";

import { TableCellKpiLoading } from "@/design-system/atoms/table-cell-kpi/table-cell-kpi.loading";
import { TableCellKpiPort } from "@/design-system/atoms/table-cell-kpi/table-cell-kpi.types";
import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi/variants/table-cell-kpi-default";

type Story = StoryObj<typeof TableCellKpi>;

const defaultProps: TableCellKpiPort = {
  children: "123",
};

const meta: Meta<typeof TableCellKpi> = {
  component: TableCellKpi,
  title: "Atoms/TableCellKpi",
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
      source: { code: "<TableCellKpi />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <TableCellKpi {...defaultProps} {...args} state={"positive"} />
        <TableCellKpi {...defaultProps} {...args} state={"negative"} />
      </div>
    );
  },
};

export const Loading: Story = {
  parameters: {
    docs: {
      source: { code: "<TableCellKpi />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <TableCellKpiLoading />
      </div>
    );
  },
};

export default meta;
