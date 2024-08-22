import { Meta, StoryObj } from "@storybook/react";
import { Square } from "lucide-react";

import { Textarea, TextareaPort } from "./index";

type Story = StoryObj<typeof Textarea>;

const defaultProps: TextareaPort = {
  name: "textarea",
  startContent: <Square size={16} />,
  endContent: <Square size={16} />,
  value: "Input text",
};

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: "Atoms/Textarea",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Textarea />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-[348px] items-center gap-2">
        <Textarea {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: { code: "<Textarea isDisabled={true} />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-[348px] items-center gap-2">
        <Textarea {...defaultProps} isDisabled={true} />
      </div>
    );
  },
};

export const Invalid: Story = {
  parameters: {
    docs: {
      source: { code: "<Textarea isError={true} />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-[348px] items-center gap-2">
        <Textarea {...defaultProps} isError={true} />
      </div>
    );
  },
};

export default meta;
