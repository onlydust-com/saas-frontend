import { Meta, StoryObj } from "@storybook/react";

import { CardFinancialLoading } from "./card-financial.loading";
import { CardFinancialPort } from "./card-financial.types";
import { CardFinancial } from "./variants/card-financial-default";

type Story = StoryObj<typeof CardFinancial>;

const defaultProps: CardFinancialPort<"div"> = {
  title: { token: "programs:budgetAvailable.available.title" },
  amount: "1000",
  currency: "USD",
  avatarGroup: {
    avatars: [
      { src: "", name: undefined },
      { src: "", name: undefined },
      { src: "", name: undefined },
    ],
  },
  cta: {
    onClick: () => {},
  },
  size: "xl",
};

const meta: Meta<typeof CardFinancial> = {
  component: CardFinancial,
  title: "Deprecated/Molecules/CardFinancial",
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
      source: { code: "<CardFinancial />" },
    },
  },
  render: args => {
    return (
      <div className="flex h-[164px] w-full items-center gap-2">
        <CardFinancial {...defaultProps} {...args} color={"chart-1"} />
        <CardFinancial {...defaultProps} {...args} color={"chart-2"} />
        <CardFinancial {...defaultProps} {...args} color={"chart-3"} />
        <CardFinancial {...defaultProps} {...args} color={"chart-4"} />
      </div>
    );
  },
};

export const CardFinancialXl: Story = {
  parameters: {
    docs: {
      source: { code: "<CardFinancial size='xl' />" },
    },
  },
  render: args => {
    return (
      <div className="flex h-[164px] w-[242px] items-center gap-2">
        <CardFinancial {...defaultProps} {...args} size="xl" />
      </div>
    );
  },
};

export const CardFinancialM: Story = {
  parameters: {
    docs: {
      source: { code: "<CardFinancial size='m' />" },
    },
  },
  render: args => {
    return (
      <div className="flex h-[164px] w-[242px] items-center gap-2">
        <CardFinancial {...defaultProps} {...args} size="m" />
      </div>
    );
  },
};

export const CardFinancialSkeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<CardFinancialLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex h-[164px] w-[242px] items-center gap-2">
        <CardFinancialLoading />
      </div>
    );
  },
};

export default meta;
