import { Meta, StoryObj } from "@storybook/react";
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

import { TableLoading } from "@/design-system/molecules/table/table.loading";

import { Table } from "./variants/table-default";

type Story = StoryObj<typeof Table>;

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("firstName", {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.lastName, {
    id: "lastName",
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("visits", {
    header: () => <span>Visits</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    footer: info => info.column.id,
  }),
  columnHelper.accessor("progress", {
    header: "Profile Progress",
    footer: info => info.column.id,
  }),
];

const meta: Meta<typeof Table> = {
  component: Table,
  title: "Molecules/Table",
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
      source: { code: "<Table />" },
    },
  },
  render: () => {
    const [data, _setData] = useState(() => [...defaultData]);

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

    return (
      <div className="flex w-full items-center gap-2">
        <Table
          header={{
            headerGroups: table.getHeaderGroups(),
          }}
          rows={table.getRowModel().rows}
        />
      </div>
    );
  },
};

export const Loading: Story = {
  parameters: {
    docs: {
      source: { code: "<TableLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <TableLoading />
      </div>
    );
  },
};

export default meta;
