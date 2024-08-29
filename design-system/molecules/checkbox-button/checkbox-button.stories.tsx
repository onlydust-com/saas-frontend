import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { CheckboxButtonPort } from "./checkbox-button.types";
import { CheckboxButton } from "./variants/checkbox-button-default";

type Story = StoryObj<typeof CheckboxButton>;

const defaultProps: CheckboxButtonPort = {
  children: "Option label",
};

const meta: Meta<typeof CheckboxButton> = {
  component: CheckboxButton,
  title: "Molecules/CheckboxButton",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<CheckboxButton />" },
    },
  },
  render: args => {
    const [value, setValue] = useState(false);
    return (
      <div className="flex w-full items-center gap-2">
        <CheckboxButton value={value} onChange={setValue} {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
