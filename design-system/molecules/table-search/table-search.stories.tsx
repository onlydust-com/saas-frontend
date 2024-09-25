import { Meta, StoryObj } from "@storybook/react";

import { TableSearchPort } from "./table-search.types";
import { TableSearch } from "./variants/table-search-default";

type Story = StoryObj<typeof TableSearch>;

const defaultProps: TableSearchPort = {
  onChange: value => console.log(value),
  onDebouncedChange: value => console.log(value),
};

const meta: Meta<typeof TableSearch> = {
  component: TableSearch,
  title: "Molecules/TableSearch",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<TableSearch />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <TableSearch {...defaultProps} />
      </div>
    );
  },
};

export default meta;
