import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";

import { DropdownPort } from "./dropdown.types";
import { Dropdown } from "./variants/dropdown-default";

type Story = StoryObj<typeof Dropdown>;

const defaultProps: DropdownPort = {
  items: [
    {
      value: "item1",
      label: "item1",
      startContent: <Icon name={"ri-square-line"} size={16} classNames={{ base: "text-inherit" }} />,
      endContent: <Icon name={"ri-square-line"} size={16} classNames={{ base: "text-inherit" }} />,
    },
    {
      value: "item2",
      label: "item2",
      startContent: <Icon name={"ri-square-line"} size={16} classNames={{ base: "text-inherit" }} />,
      endContent: <Icon name={"ri-square-line"} size={16} classNames={{ base: "text-inherit" }} />,
    },
    {
      value: "item3",
      label: "item3",
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
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    return (
      <div className="flex w-full items-center gap-2">
        <Dropdown
          {...defaultProps}
          {...args}
          isMultipleSelection={false}
          selectedKeys={selectedKeys}
          onChange={keys => setSelectedKeys(keys)}
          multipleSelectionCountLabel={"items selected"}
        >
          {({ label }) => <Button>{label || "Open dropdown"}</Button>}
        </Dropdown>
      </div>
    );
  },
};

export default meta;
