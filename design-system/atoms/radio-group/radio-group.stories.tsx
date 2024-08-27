import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { RadioGroupPort } from "./radio-group.types";
import { RadioGroup } from "./variants/radio-group-default";

type Story = StoryObj<typeof RadioGroup>;

const defaultProps: RadioGroupPort<string, "div"> = {
  value: "Option 1",
  items: [
    {
      value: "Option 1",
    },
    {
      value: "Option 2",
    },
  ],
};

const contentProps: RadioGroupPort<string, "div"> = {
  value: "Option 4",
  layout: "vertical",
  items: [
    {
      value: "Option 1",
      title: { children: "Placeholder" },
      description: { children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    },
    {
      value: "Option 2",
      attr: { "data-hover": true },
      title: { children: "Placeholder" },
      description: { children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    },
    {
      value: "Option 3",
      attr: { "data-focus": true },
      title: { children: "Placeholder" },
      description: { children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    },
    {
      value: "Option 4",
      title: { children: "Placeholder" },
      description: { children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    },
    {
      value: "Option 6",
      title: { children: "Placeholder" },
      isDisabled: true,
      description: { children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    },
  ],
};

const DefaultSingleProps = (
  args?: Partial<RadioGroupPort<string, "div">["items"][0]>,
  selected?: boolean
): RadioGroupPort<string, "div"> => {
  return {
    value: selected ? "Option 1" : "",
    items: [
      {
        value: "Option 1",
        ...(args || {}),
      },
    ],
  };
};

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  title: "Atoms/RadioGroup",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Radio />" },
    },
  },
  render: args => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="flex w-full items-center gap-2">
        <RadioGroup {...defaultProps} {...args} value={value} onChange={v => setValue(v)} />
      </div>
    );
  },
};

export const States: Story = {
  parameters: {
    docs: {
      source: { code: "<RadioGroup />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-6">
        <div className="flex w-full items-center gap-6">
          <RadioGroup {...DefaultSingleProps()} {...args} />
          <RadioGroup {...DefaultSingleProps({}, true)} {...args} />
        </div>
        <div className="flex w-full items-center gap-6">
          <RadioGroup {...DefaultSingleProps({ attr: { "data-hover": true } })} {...args} />
          <RadioGroup {...DefaultSingleProps({ attr: { "data-hover": true } }, true)} {...args} />
        </div>
        <div className="flex w-full items-center gap-6">
          <RadioGroup {...DefaultSingleProps({ attr: { "data-focus": true } })} {...args} />
          <RadioGroup {...DefaultSingleProps({ attr: { "data-focus": true } }, true)} {...args} />
        </div>
        <div className="flex w-full items-center gap-6">
          <RadioGroup isDisabled={true} {...DefaultSingleProps()} {...args} />
          <RadioGroup isDisabled={true} {...DefaultSingleProps({}, true)} {...args} />
        </div>
      </div>
    );
  },
};

export const WithContent: Story = {
  parameters: {
    docs: {
      source: { code: "<RadioGroup />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-start gap-6">
        <RadioGroup {...contentProps} {...args} />
      </div>
    );
  },
};

export default meta;
