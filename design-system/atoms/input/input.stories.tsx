import { Meta, StoryObj } from "@storybook/react";

import { Icon } from "@/design-system/atoms/icon";
import { InputLoading } from "@/design-system/atoms/input/input.loading";

import { InputPort } from "./input.types";
import { Input } from "./variants/input-default";

type Story = StoryObj<typeof Input>;

const defaultProps: InputPort = {
  startContent: <Icon name="ri-square-line" classNames={{ base: "text-inherit" }} />,
  endContent: <Icon name="ri-square-line" classNames={{ base: "text-inherit" }} />,
  value: "Input text",
};

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Atoms/Input",
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
      source: { code: "<Input />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Input {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Label: Story = {
  parameters: {
    docs: {
      source: { code: "<Input label='Input label' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Input {...defaultProps} {...args} label={"Input label"} />
      </div>
    );
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: { code: "<Input isDisabled={true} />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-[348px] items-center gap-2">
        <Input {...defaultProps} isDisabled={true} />
      </div>
    );
  },
};

export const Invalid: Story = {
  parameters: {
    docs: {
      source: { code: "<Input isError={true} />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-[348px] items-center gap-2">
        <Input {...defaultProps} isError={true} />
      </div>
    );
  },
};
export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<InputLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-[348px] items-center gap-2">
        <InputLoading />
      </div>
    );
  },
};

export default meta;
