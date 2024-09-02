import { Meta, StoryObj } from "@storybook/react";

import { TableGroupByLoading } from "@/design-system/molecules/table-group-by/table-group-by.loading";

import { TableGroupByPort } from "./table-group-by.types";
import { TableGroupBy } from "./variants/table-group-by-default";

type Story = StoryObj<typeof TableGroupBy>;

const defaultProps: TableGroupByPort = {
  value: "",
  onChange: () => {},
  onClear: () => {},
  items: [
    {
      value: "1",
      label: "Label 1",
    },
    {
      value: "2",
      label: "Label 2",
    },
  ],
};

const meta: Meta<typeof TableGroupBy> = {
  component: TableGroupBy,
  title: "Molecules/TableGroupBy",
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
      source: { code: "<TableGroupBy />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <TableGroupBy {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Loading: Story = {
  parameters: {
    docs: {
      source: { code: "<TableGroupByLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <TableGroupByLoading />
      </div>
    );
  },
};

export default meta;
