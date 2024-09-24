import { Meta, StoryObj } from "@storybook/react";

import { TableColumnListLoading } from "@/design-system/molecules/table-column-list/table-column-list.loading";

import { TableColumnListPort } from "./table-column-list.types";
import { TableColumnList } from "./variants/table-column-list-default";

type Story = StoryObj<typeof TableColumnList>;

const defaultProps: TableColumnListPort = {
  titleProps: {
    token: "data:deepDive.projectsTable.filters.columnList",
  },
  menuProps: {
    items: [
      {
        id: "1",
        label: "Label 1",
        isCheckbox: true,
      },
      {
        id: "2",
        label: "Label 2",
        isCheckbox: true,
      },
    ],
  },
};

const meta: Meta<typeof TableColumnList> = {
  component: TableColumnList,
  title: "Molecules/TableColumnList",
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
      source: { code: "<TableColumnList />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <TableColumnList {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Loading: Story = {
  parameters: {
    docs: {
      source: { code: "<TableColumnListLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <TableColumnListLoading />
      </div>
    );
  },
};

export default meta;
