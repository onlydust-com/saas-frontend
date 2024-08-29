import { Meta, StoryObj } from "@storybook/react";
import { CircleDashed } from "lucide-react";

import { MenuItemPort } from "./menu-item.types";
import { MenuItem } from "./variants/menu-item-default";

type Story = StoryObj<typeof MenuItem>;

const defaultProps: MenuItemPort = {
  label: "Item 1",
  id: "item1",
};

const meta: Meta<typeof MenuItem> = {
  component: MenuItem,
  title: "Molecules/MenuItem",
  tags: ["autodocs"],
};

function MenuItemTemplate(args: MenuItemPort) {
  return <MenuItem {...defaultProps} {...args} classNames={{ base: "max-w-[192px] w-[192px]" }} />;
}

function MenuItemAvatarTemplate(args: MenuItemPort) {
  return <MenuItemTemplate {...args} avatar={{ src: "" }} />;
}

function MenuItemIconTemplate(args: MenuItemPort) {
  return <MenuItemTemplate {...args} icon={{ component: CircleDashed }} />;
}

function MenuItemCheckboxTemplate(args: MenuItemPort) {
  return <MenuItemTemplate {...args} isCheckbox />;
}

function MenuItemRadioTemplate(args: MenuItemPort) {
  return <MenuItemTemplate {...args} isRadio />;
}

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<MenuItem />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <MenuItemTemplate {...args} />
      </div>
    );
  },
};

export const Base: Story = {
  parameters: {
    docs: {
      source: { code: "<MenuItem />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full gap-5">
        <div className="flex w-full flex-col gap-5">
          <div className="flex w-full flex-col gap-2">
            <MenuItemTemplate {...args} />
            <MenuItemTemplate {...args} attr={{ "data-hover": true }} />
            <MenuItemTemplate {...args} isDisabled />
          </div>
          <div className="flex w-full flex-col gap-2">
            <MenuItemAvatarTemplate {...args} />
            <MenuItemAvatarTemplate {...args} attr={{ "data-hover": true }} />
            <MenuItemAvatarTemplate {...args} isDisabled />
          </div>
          <div className="flex w-full flex-col gap-2">
            <MenuItemIconTemplate {...args} />
            <MenuItemIconTemplate {...args} attr={{ "data-hover": true }} />
            <MenuItemIconTemplate {...args} isDisabled />
          </div>
          <div className="flex w-full flex-col gap-2">
            <MenuItemCheckboxTemplate {...args} />
            <MenuItemCheckboxTemplate {...args} attr={{ "data-hover": true }} />
            <MenuItemCheckboxTemplate {...args} isDisabled />
          </div>
          <div className="flex w-full flex-col gap-2">
            <MenuItemRadioTemplate {...args} />
            <MenuItemRadioTemplate {...args} attr={{ "data-hover": true }} />
            <MenuItemRadioTemplate {...args} isDisabled />
          </div>
        </div>
        <div className="flex w-full flex-col gap-5">
          <div className="flex w-full flex-col gap-2">
            <MenuItemTemplate {...args} isSelected={true} />
            <MenuItemTemplate {...args} isSelected={true} attr={{ "data-hover": true }} />
            <MenuItemTemplate {...args} isSelected={true} isDisabled />
          </div>
          <div className="flex w-full flex-col gap-2">
            <MenuItemAvatarTemplate {...args} isSelected={true} />
            <MenuItemAvatarTemplate {...args} isSelected={true} attr={{ "data-hover": true }} />
            <MenuItemAvatarTemplate {...args} isSelected={true} isDisabled />
          </div>
          <div className="flex w-full flex-col gap-2">
            <MenuItemIconTemplate {...args} isSelected={true} />
            <MenuItemIconTemplate {...args} isSelected={true} attr={{ "data-hover": true }} />
            <MenuItemIconTemplate {...args} isSelected={true} isDisabled />
          </div>
          <div className="flex w-full flex-col gap-2">
            <MenuItemCheckboxTemplate {...args} isSelected={true} />
            <MenuItemCheckboxTemplate {...args} isSelected={true} attr={{ "data-hover": true }} />
            <MenuItemCheckboxTemplate {...args} isSelected={true} isDisabled />
          </div>
          <div className="flex w-full flex-col gap-2">
            <MenuItemRadioTemplate {...args} isSelected={true} />
            <MenuItemRadioTemplate {...args} isSelected={true} attr={{ "data-hover": true }} />
            <MenuItemRadioTemplate {...args} isSelected={true} isDisabled />
          </div>
        </div>
      </div>
    );
  },
};

export const Avatar: Story = {
  parameters: {
    docs: {
      source: { code: "<MenuItem />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full gap-5">
        <div className="flex w-full flex-col gap-2">
          <MenuItemAvatarTemplate {...args} />
          <MenuItemAvatarTemplate {...args} attr={{ "data-hover": true }} />
          <MenuItemAvatarTemplate {...args} isDisabled />
        </div>
        <div className="flex w-full flex-col gap-2">
          <MenuItemAvatarTemplate {...args} isSelected={true} />
          <MenuItemAvatarTemplate {...args} isSelected={true} attr={{ "data-hover": true }} />
          <MenuItemAvatarTemplate {...args} isSelected={true} isDisabled />
        </div>
      </div>
    );
  },
};

export const Icon: Story = {
  parameters: {
    docs: {
      source: { code: "<MenuItem />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full gap-5">
        <div className="flex w-full flex-col gap-2">
          <MenuItemIconTemplate {...args} />
          <MenuItemIconTemplate {...args} attr={{ "data-hover": true }} />
          <MenuItemIconTemplate {...args} isDisabled />
        </div>
        <div className="flex w-full flex-col gap-2">
          <MenuItemIconTemplate {...args} isSelected={true} />
          <MenuItemIconTemplate {...args} isSelected={true} attr={{ "data-hover": true }} />
          <MenuItemIconTemplate {...args} isSelected={true} isDisabled />
        </div>
      </div>
    );
  },
};
export const Checbox: Story = {
  parameters: {
    docs: {
      source: { code: "<MenuItem />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full gap-5">
        <div className="flex w-full flex-col gap-2">
          <MenuItemCheckboxTemplate {...args} />
          <MenuItemCheckboxTemplate {...args} attr={{ "data-hover": true }} />
          <MenuItemCheckboxTemplate {...args} isDisabled />
        </div>
        <div className="flex w-full flex-col gap-2">
          <MenuItemCheckboxTemplate {...args} isSelected={true} />
          <MenuItemCheckboxTemplate {...args} isSelected={true} attr={{ "data-hover": true }} />
          <MenuItemCheckboxTemplate {...args} isSelected={true} isDisabled />
        </div>
      </div>
    );
  },
};

export const Radio: Story = {
  parameters: {
    docs: {
      source: { code: "<MenuItem />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full gap-5">
        <div className="flex w-full flex-col gap-2">
          <MenuItemRadioTemplate {...args} />
          <MenuItemRadioTemplate {...args} attr={{ "data-hover": true }} />
          <MenuItemRadioTemplate {...args} isDisabled />
        </div>
        <div className="flex w-full flex-col gap-2">
          <MenuItemRadioTemplate {...args} isSelected={true} />
          <MenuItemRadioTemplate {...args} isSelected={true} attr={{ "data-hover": true }} />
          <MenuItemRadioTemplate {...args} isSelected={true} isDisabled />
        </div>
      </div>
    );
  },
};

export default meta;
