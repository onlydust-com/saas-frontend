import { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { AlertComponent } from "./adapters/sonner/sonner.adapter";
import { AlertProps } from "./alert.types";
import { Alert, alert } from "./variants/alert-default";

type Story = StoryObj<typeof Alert>;

const defaultProps: AlertProps = {
  title: "Alert Title",
  description: "This is a description of the alert.",
};

const colors: AlertProps["color"][] = ["white", "grey", "brand", "error", "warning", "success"];

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: "Molecules/Alert",
  tags: ["autodocs"],
  decorators: [
    Story => (
      <>
        <Story />
        <Alert />
      </>
    ),
  ],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Alert />" },
    },
  },
  render: () => <Button onClick={() => alert.white(defaultProps)}>Open default</Button>,
};

export const Colors: Story = {
  parameters: {
    docs: {
      source: { code: "<Alert />" },
    },
  },
  render: args => (
    <div className="flex w-[480px] flex-col gap-4">
      {colors.map(color => (
        <AlertComponent key={color} {...defaultProps} {...args} color={color} toastId="" />
      ))}
    </div>
  ),
};

export const WithButtons: Story = {
  parameters: {
    docs: {
      source: { code: "<Alert />" },
    },
  },
  render: args => (
    <div className="flex w-[480px] flex-col gap-4">
      {colors.map(color => (
        <AlertComponent
          key={color}
          {...defaultProps}
          {...args}
          color={color}
          toastId=""
          primaryButton={{
            children: "Primary Action",
          }}
          secondaryButton={{
            children: "Secondary Action",
          }}
        />
      ))}
    </div>
  ),
};

export default meta;
