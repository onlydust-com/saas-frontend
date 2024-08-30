import { Meta, StoryObj } from "@storybook/react";

import { CardFinancialLoading } from "./card-financial.loading";
import { CardFinancialPort } from "./card-financial.types";
import { CardFinancial } from "./variants/card-financial-default";

type Story = StoryObj<typeof CardFinancial>;

const defaultProps: CardFinancialPort<"div"> = {
  title: { token: "programs:budgetAvailable.available.title" },
  amount: "500 000.00",
  currency: "USD",
  avatarGroup: {
    avatars: [{ src: "" }, { src: "" }, { src: "" }],
  },
  cta: {
    onClick: () => {},
  },
  size: "xl",
};

const meta: Meta<typeof CardFinancial> = {
  component: CardFinancial,
  title: "Molecules/Cards/CardFinancial",
  tags: ["autodocs"],
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
        <CardFinancial {...defaultProps} {...args} color={"grey"} />
        <CardFinancial {...defaultProps} {...args} color={"gradient"} />
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
