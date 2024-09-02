import { Meta, StoryObj } from "@storybook/react";

import { TableFilterLoading } from "@/design-system/molecules/table-filter/table-filter.loading";

import { TableFilterPort } from "./table-filter.types";
import { TableFilter } from "./variants/table-filter-default";

type Story = StoryObj<typeof TableFilter>;

const defaultProps: TableFilterPort = {
  filterCount: 3,
  onClear: () => alert("Clear filters !"),
};

const meta: Meta<typeof TableFilter> = {
  component: TableFilter,
  title: "Molecules/TableFilter",
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
      source: { code: "<TableFilter />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <TableFilter {...defaultProps} {...args}>
          Filters go here
        </TableFilter>
      </div>
    );
  },
};

export const Loading: Story = {
  parameters: {
    docs: {
      source: { code: "<TableFilterLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <TableFilterLoading />
      </div>
    );
  },
};

export default meta;
