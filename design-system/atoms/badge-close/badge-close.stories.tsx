import { Meta, StoryObj } from "@storybook/react";

import { BadgeClosePort } from "./badge-close.types";
import { BadgeClose } from "./variants/badge-close-default";

type Story = StoryObj<typeof BadgeClose>;

const defaultProps: BadgeClosePort<"div"> = {
  classNames: {},
  htmlProps: {},
  onClose: () => {},
  shape: "rounded",
  color: "grey",
};

const shape = ["rounded", "squared"] as const;
const colors = ["grey", "brand", "error", "warning", "success"] as const;

const meta: Meta<typeof BadgeClose> = {
  component: BadgeClose,
  title: "Atoms/BadgeClose",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<BadgeClose />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <BadgeClose {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Rounded: Story = {
  parameters: {
    docs: {
      source: { code: "<BadgeClose shape='rounded' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <BadgeClose {...defaultProps} {...args} shape={"rounded"} />
      </div>
    );
  },
};

export const Squared: Story = {
  parameters: {
    docs: {
      source: { code: "<BadgeClose shape='squared' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <BadgeClose {...defaultProps} {...args} shape={"squared"} />
      </div>
    );
  },
};

export const Colors: Story = {
  parameters: {
    docs: {
      source: { code: "<BadgeClose color='grey' shape='rounded' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        {colors.map(c => {
          return (
            <div key={c} className="flex w-full items-center gap-2">
              {shape.map(s => {
                return <BadgeClose key={`${c}-${s}`} {...defaultProps} {...args} color={c} shape={s} />;
              })}
            </div>
          );
        })}
      </div>
    );
  },
};

export default meta;
