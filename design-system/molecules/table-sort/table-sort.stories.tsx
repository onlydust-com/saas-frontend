import { Meta, StoryObj } from "@storybook/react";
import { TableSortPort } from "./table-sort.types";

import { TableSort } from "./variants/table-sort-default";

type Story = StoryObj<typeof TableSort>;

const defaultProps: TableSortPort<"div"> = {};

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
  render: (args) => {
    return (
      <div className="flex w-full items-center gap-2">
        <TableSort {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
