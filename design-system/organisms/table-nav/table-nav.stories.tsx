import { Meta, StoryObj } from "@storybook/react";

import { SortDirection } from "@/design-system/molecules/table-sort";
import { TableNavLoading } from "@/design-system/organisms/table-nav/table-nav.loading";

import { TableNavPort } from "./table-nav.types";
import { TableNav } from "./variants/table-nav-default";

type Story = StoryObj<typeof TableNav>;

const defaultProps: TableNavPort = {
  filter: {
    filterCount: 3,
    onClear: () => alert("Clear filters !"),
  },
  sort: {
    direction: SortDirection.DESC,
    onDirectionChange: () => {},
  },
  groupBy: {
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
  },
  search: {
    value: "Search the data",
  },
  columnList: {
    onChange: () => {},
    onClear: () => {},
    items: [
      {
        id: "1",
        label: "Label 1",
        value: true,
      },
      {
        id: "2",
        label: "Label 2",
        value: false,
      },
    ],
  },
};

const meta: Meta<typeof TableNav> = {
  component: TableNav,
  title: "Deprecated/Organisms/TableNav",
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
      source: { code: "<TableNav />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <TableNav {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Loading: Story = {
  parameters: {
    docs: {
      source: { code: "<TableNavLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <TableNavLoading />
      </div>
    );
  },
};

export default meta;
