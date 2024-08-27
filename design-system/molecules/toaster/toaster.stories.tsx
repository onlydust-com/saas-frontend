import { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { ToasterPort } from "./toaster.types";
import { Toaster, toast } from "./variants/toaster-default";

type Story = StoryObj<typeof Toaster>;

const defaultProps: ToasterPort = {
  position: "bottom-left",
};

const meta: Meta<typeof Toaster> = {
  component: Toaster,
  title: "Molecules/Toaster",
  tags: ["autodocs"],
  decorators: [
    Story => (
      <>
        <Story />
        <Toaster {...defaultProps} />
      </>
    ),
  ],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: '<Button onClick={() => toast.default("Hello World")}>Show Default Toast</Button>' },
    },
  },
  render: () => {
    return <Button onClick={() => toast.default("Hello World")}>Show Default Toast</Button>;
  },
};

export const Error: Story = {
  parameters: {
    docs: {
      source: {
        code: '<Button theme="destructive" onClick={() => toast.error("An error occurred")}>Show Error Toast</Button>',
      },
    },
  },
  render: () => {
    return (
      <Button theme="destructive" onClick={() => toast.error("An error occurred")}>
        Show Error Toast
      </Button>
    );
  },
};

export default meta;
