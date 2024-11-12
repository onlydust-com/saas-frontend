import { Meta, StoryObj } from "@storybook/react";

import { TableResizerPort } from "./table-resizer.types";
import { TableResizer } from "./variants/table-resizer-default";

type Story = StoryObj<typeof TableResizer>;

// TODO: Implement
const defaultProps: TableResizerPort = {
  onMouseDown: () => {},
  onTouchStart: () => {},
};

const meta: Meta<typeof TableResizer> = {
  component: TableResizer,
  title: "Molecules/TableResizer",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<TableResizer />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <TableResizer {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
