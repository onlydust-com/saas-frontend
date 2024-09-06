import { Meta, StoryObj } from "@storybook/react";

import { SelectPort } from "./select.types";
import { Select } from "./variants/select-default";

type Story = StoryObj<typeof Select>;

const defaultProps: SelectPort<"div"> = {};

const meta: Meta<typeof Select> = {
  component: Select,
  title: "Molecules/Select",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Select />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Select {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
