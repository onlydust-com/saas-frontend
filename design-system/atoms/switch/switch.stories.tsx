import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { SwitchPort } from "./switch.types";
import { Switch } from "./variants/switch-default";

type Story = StoryObj<typeof Switch>;

const defaultProps: SwitchPort = {
  isSelected: false,
  onChange: () => null,
  isDisabled: false,
};

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: "Atoms/Switch",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Switch />" },
    },
  },
  render: args => {
    const [isChecked, setIsChecked] = useState(false);
    return (
      <div className="flex w-full items-center gap-2">
        <Switch {...defaultProps} {...args} isSelected={isChecked} onChange={setIsChecked} />
      </div>
    );
  },
};

export const Active: Story = {
  parameters: {
    docs: {
      source: { code: "<Switch isSelected />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full">
        <Switch {...defaultProps} isSelected />
      </div>
    );
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: { code: "<Switch isDisabled />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full">
        <Switch {...defaultProps} isDisabled />
      </div>
    );
  },
};

export const ActiveDisabled: Story = {
  parameters: {
    docs: {
      source: { code: "<Switch isDisabled isSelected />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full">
        <Switch {...defaultProps} isDisabled isSelected />
      </div>
    );
  },
};

export const WithLabel: Story = {
  parameters: {
    docs: {
      source: { code: "<Switch />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Switch
          {...defaultProps}
          {...args}
          label={{ token: "stories:checkbox.label" }}
          description={{ token: "stories:checkbox.description" }}
        ></Switch>
      </div>
    );
  },
};

export default meta;
