import { Meta, StoryObj } from "@storybook/react";
import { Rocket } from "lucide-react";

import { AlertLoading } from "./alert.loading";
import { AlertPort } from "./alert.types";
import { Alert } from "./variants/alert-default";

type Story = StoryObj<typeof Alert>;

const defaultProps: AlertPort = {
  title: "Alert Title",
  description: "This is a description of the alert.",
};

const colors: AlertPort["color"][] = ["white", "grey", "brand", "error", "warning", "success"];

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: "Molecules/Alert",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Alert />" },
    },
  },
  render: args => (
    <div className="w-[480px]">
      <Alert {...defaultProps} {...args} />
    </div>
  ),
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
        <Alert key={color} {...defaultProps} {...args} color={color} />
      ))}
    </div>
  ),
};

export const NoIcon: Story = {
  parameters: {
    docs: {
      source: { code: "<Alert hasIcon={false} />" },
    },
  },
  render: args => (
    <div className="flex w-[480px] flex-col gap-4">
      {colors.map(color => (
        <Alert key={color} {...defaultProps} {...args} color={color} hasIcon={false} />
      ))}
    </div>
  ),
};

export const WithCustomIcon: Story = {
  parameters: {
    docs: {
      source: { code: "<Alert icon={{ component: Rocket }} />" },
    },
  },
  render: args => (
    <div className="flex w-[480px] flex-col gap-4">
      {colors.map(color => (
        <Alert key={color} {...defaultProps} {...args} color={color} icon={{ component: Rocket }} />
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
        <Alert
          key={color}
          {...defaultProps}
          {...args}
          color={color}
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

export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<AlertLoading />" },
    },
  },
  render: () => {
    return (
      <div className="w-[480px]">
        <AlertLoading />
      </div>
    );
  },
};

export default meta;
