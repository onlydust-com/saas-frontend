import { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { DropdownPort } from "./dropdown.types";
import { Dropdown } from "./variants/dropdown-default";

type Story = StoryObj<typeof Dropdown>;

const defaultProps: DropdownPort<"div"> = {
  items: [
    {
      key: "item1",
      children: "item1",
    },
    {
      key: "item2",
      children: "item2",
    },
    {
      key: "item3",
      children: "item3",
    },
  ],
};

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  title: "Atoms/Dropdown",
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
      source: { code: "<Dropdown />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Dropdown {...defaultProps} {...args}>
          <Button>Open dropdown</Button>
        </Dropdown>
      </div>
    );
  },
};

export default meta;
