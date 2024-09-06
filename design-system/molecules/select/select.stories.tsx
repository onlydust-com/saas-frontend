import { Meta, StoryObj } from "@storybook/react";
import { CircleDashed } from "lucide-react";
import { useState } from "react";

import { MenuItemPort } from "@/design-system/molecules/menu-item";

import { SelectPort } from "./select.types";
import { Select } from "./variants/select-default";

type Story = StoryObj<typeof Select>;

const defaultProps: SelectPort<"div"> = {
  placeholder: "Select your item",
  items: [
    { id: "item1", label: "Item 1" },
    { id: "item2", label: "Item 2", icon: { component: CircleDashed } },
    { id: "item3", label: "Item 3", avatar: { src: "" } },
    { id: "item4", label: "Item 4", isCheckbox: true },
    { id: "item5", label: "Item 4", isRadio: true },
    { id: "item6", label: "Item 6" },
    { id: "item7", label: "Item 7" },
    { id: "item8", label: "Item 8" },
    { id: "item9", label: "Item 9" },
  ],
};

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
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    return (
      <div className="flex w-full items-center gap-2">
        <Select {...defaultProps} {...args} selectedIds={selectedIds} onSelect={setSelectedIds} closeOnSelect={false} />
      </div>
    );
  },
};

export const WithShowMore: Story = {
  parameters: {
    docs: {
      source: { code: "<Select />" },
    },
  },
  render: args => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [items, setItems] = useState<MenuItemPort[]>(defaultProps.items);
    const [fromIndex, setFromIndex] = useState(10);
    const [isLoading, setIsLoading] = useState(false);

    function createFakeItems(fromIndex: number) {
      return Array.from({ length: 15 }, (_, index) => ({
        id: `item${index + fromIndex}`,
        label: `Item ${index + fromIndex}`,
      }));
    }
    function nextPage() {
      console.log("NEXT PAGE");
      setIsLoading(true);
      return new Promise<MenuItemPort[]>(resolve => {
        setTimeout(() => {
          const newItems = [...items, ...createFakeItems(fromIndex)];
          setFromIndex(fromIndex + 16);
          setItems(newItems);
          setIsLoading(false);
          resolve(newItems);
        }, 50);
      });
    }

    return (
      <div className="flex w-full items-center gap-2">
        <Select
          {...defaultProps}
          {...args}
          items={items}
          selectedIds={selectedIds}
          onSelect={setSelectedIds}
          closeOnSelect={false}
          hasNextPage={true}
          onNextPage={nextPage}
          isLoading={isLoading}
        />
      </div>
    );
  },
};

export default meta;
