import { Meta, StoryObj } from "@storybook/react";

import { TableSortLoading } from "@/design-system/molecules/table-sort/table-sort.loading";

import { SortDirection, TableSortPort } from "./table-sort.types";
import { TableSort } from "./variants/table-sort-default";

type Story = StoryObj<typeof TableSort>;

const defaultProps: TableSortPort = {
  direction: SortDirection.DESC,
  onDirectionChange: () => {},
};

const meta: Meta<typeof TableSort> = {
  component: TableSort,
  title: "Molecules/TableSort",
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
      source: { code: "<TableSort />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <TableSort {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Selected: Story = {
  parameters: {
    docs: {
      source: { code: "<TableSort isSelected />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <TableSort {...defaultProps} {...args} isSelected />
      </div>
    );
  },
};

export const Loading: Story = {
  parameters: {
    docs: {
      source: { code: "<TableSortLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <TableSortLoading />
      </div>
    );
  },
};

export default meta;
