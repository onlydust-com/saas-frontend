import { Meta, StoryObj } from "@storybook/react";
import { CircleDashed } from "lucide-react";
import { useState } from "react";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";

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
    const [selectedIds, setSelectedIds] = useState<MenuItemId[]>([]);
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
    const [selectedIds, setSelectedIds] = useState<MenuItemId[]>([]);
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

export const Disabled: Story = {
  parameters: {
    docs: {
      source: { code: "<Select />" },
    },
  },
  render: () => {
    const [selectedIds, setSelectedIds] = useState<MenuItemId[]>([]);
    return (
      <div className="flex w-full items-center gap-2">
        <Select
          {...defaultProps}
          isDisabled={true}
          selectedIds={selectedIds}
          onSelect={setSelectedIds}
          closeOnSelect={false}
        />
      </div>
    );
  },
};

export const withLabel: Story = {
  parameters: {
    docs: {
      source: { code: "<Input label='Input label' />" },
    },
  },
  render: () => {
    return (
      <div className="flex flex-row items-start gap-6">
        <Select
          {...defaultProps}
          closeOnSelect={false}
          label={"label"}
          description={"Lorem ipsum dolor sit amet"}
          info={{ text: "Lorem ipsum dolor sit amet" }}
          error={{ text: "Lorem ipsum dolor sit amet" }}
        />
        <Select
          {...defaultProps}
          closeOnSelect={false}
          label={"label"}
          description={"Lorem ipsum dolor sit amet"}
          info={{ text: "Lorem ipsum dolor sit amet" }}
          error={{ text: "Lorem ipsum dolor sit amet" }}
          isError={true}
        />
      </div>
    );
  },
};

export const AutoComplete: Story = {
  parameters: {
    docs: {
      source: { code: "<Select />" },
    },
  },
  render: () => {
    const [selectedIds, setSelectedIds] = useState<MenuItemId[]>([]);
    return (
      <div className="flex w-full items-center gap-2">
        <Select
          {...defaultProps}
          placeholder={"Search for an item"}
          isAutoComplete={true}
          selectedIds={selectedIds}
          onSelect={setSelectedIds}
          closeOnSelect={false}
        />
      </div>
    );
  },
};

export default meta;
