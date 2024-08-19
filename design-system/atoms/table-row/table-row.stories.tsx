import { Meta, StoryObj } from "@storybook/react";
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { TableRowLoading } from "@/design-system/atoms/table-row/table-row.loading";
import { AvatarDescription } from "@/design-system/molecules/avatar-description";
import { AvatarGroupDescription } from "@/design-system/molecules/avatar-group-description";

import { TableRow } from "./variants/table-row-default";

type Story = StoryObj<typeof TableRow>;

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
    cell: info => (
      <AvatarDescription
        avatarProps={{}}
        labelProps={{
          children: info.getValue(),
        }}
      />
    ),
  }),
  columnHelper.accessor(row => row.lastName, {
    id: "lastName",
    cell: info => (
      <AvatarDescription
        avatarProps={{}}
        labelProps={{
          children: info.getValue(),
        }}
      />
    ),
  }),
  columnHelper.accessor("age", {
    cell: info => (
      <AvatarGroupDescription
        avatarGroupProps={{
          avatars: [{}, {}, {}],
        }}
        labelProps={{
          children: info.getValue(),
        }}
      />
    ),
  }),
  columnHelper.accessor("visits", {
    cell: info => <TableCellKpi>{info.getValue()}</TableCellKpi>,
  }),
  columnHelper.accessor("status", {
    cell: info => <TableCellKpi trend={"UP"}>{info.getValue()}</TableCellKpi>,
  }),
  columnHelper.accessor("progress", {
    cell: info => <TableCellKpi trend={"DOWN"}>{info.getValue()}</TableCellKpi>,
  }),
];

const meta: Meta<typeof TableRow> = {
  component: TableRow,
  title: "Atoms/TableRow",
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
      source: { code: "<TableRow />" },
    },
  },
  render: args => {
    const [data, _setData] = useState(() => [...defaultData]);

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

    return (
      <div className="flex w-full items-center gap-2">
        <table className={"w-full border-separate border-spacing-y-3"}>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id} {...args} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};

export const Loading: Story = {
  parameters: {
    docs: {
      source: { code: "<TableRowLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <TableRowLoading />
      </div>
    );
  },
};

export default meta;
