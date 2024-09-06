import { Meta, StoryObj } from "@storybook/react";

import { Checkbox, CheckboxPort } from "./index";

type Story = StoryObj<typeof Checkbox>;

const defaultProps: CheckboxPort = {};

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "Atoms/Checkbox",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Checkbox />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Checkbox {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Primary: Story = {
  parameters: {
    docs: {
      source: { code: "<Checkbox />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <Checkbox {...defaultProps} />
        <Checkbox {...defaultProps} value={true} />
        <Checkbox {...defaultProps} mixed />
        <Checkbox {...defaultProps} isDisabled />
        <Checkbox {...defaultProps} isDisabled value={true} />
        <Checkbox {...defaultProps} mixed isDisabled value={true} />
      </div>
    );
  },
};

export const WithLabel: Story = {
  parameters: {
    docs: {
      source: { code: "<Checkbox />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full flex-col gap-2">
        <Checkbox
          {...defaultProps}
          label={{ token: "stories:checkbox.label" }}
          description={{ token: "stories:checkbox.description" }}
        />
        <Checkbox
          {...defaultProps}
          label={{ token: "stories:checkbox.label" }}
          description={{ token: "stories:checkbox.description" }}
          value={true}
        />
        <Checkbox
          {...defaultProps}
          label={{ token: "stories:checkbox.label" }}
          description={{ token: "stories:checkbox.description" }}
          mixed
        />
        <Checkbox
          {...defaultProps}
          label={{ token: "stories:checkbox.label" }}
          description={{ token: "stories:checkbox.description" }}
          isDisabled
        />
        <Checkbox
          {...defaultProps}
          label={{ token: "stories:checkbox.label" }}
          description={{ token: "stories:checkbox.description" }}
          isDisabled
          value={true}
        />
        <Checkbox
          {...defaultProps}
          label={{ token: "stories:checkbox.label" }}
          description={{ token: "stories:checkbox.description" }}
          mixed
          isDisabled
          value={true}
        />
      </div>
    );
  },
};

export default meta;
