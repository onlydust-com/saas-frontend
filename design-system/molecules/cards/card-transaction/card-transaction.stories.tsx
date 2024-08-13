import { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "@/design-system/atoms/avatar";

import { CardTransactionDefaultAdapter } from "./adapters/default/default.adapter";
import { CardTransactionLoading } from "./card-transaction.loading";
import { CardTransactionPort } from "./card-transaction.types";

type Story = StoryObj<typeof CardTransactionDefaultAdapter>;

const defaultProps: CardTransactionPort<"div"> = {
  type: "GRANTED",
  date: "2024-06-11",
  amount: {
    value: 120000,
    currency: {
      id: "",
      code: "USDC",
      name: "USD Coin",
      logoUrl: undefined,
      decimals: 2,
    },
    usdEquivalent: 120000,
  },
  buttonProps: {
    startContent: <Avatar src={undefined} size="xs" shape="square" />,
    children: "Project",
  },
};

const meta: Meta<typeof CardTransactionDefaultAdapter> = {
  component: CardTransactionDefaultAdapter,
  title: "Molecules/Cards/CardTransaction",
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
      source: { code: "<CardTransactionDefaultAdapter />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardTransactionDefaultAdapter {...defaultProps} {...args} />
      </div>
    );
  },
};

export const GrantedType: Story = {
  parameters: {
    docs: {
      source: {
        code: "<CardTransactionDefaultAdapter type='GRANTED' />",
      },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardTransactionDefaultAdapter {...defaultProps} {...args} type="GRANTED" />
      </div>
    );
  },
};

export const AllocatedType: Story = {
  parameters: {
    docs: {
      source: {
        code: "<CardTransactionDefaultAdapter type='RECEIVED' />",
      },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardTransactionDefaultAdapter {...defaultProps} {...args} type="RECEIVED" />
      </div>
    );
  },
};

export const ReturnedType: Story = {
  parameters: {
    docs: {
      source: {
        code: "<CardTransactionDefaultAdapter type='RETURNED' />",
      },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardTransactionDefaultAdapter {...defaultProps} {...args} type="RETURNED" />
      </div>
    );
  },
};

export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<CardTransactionLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-[345px] items-center gap-2">
        <CardTransactionLoading />
      </div>
    );
  },
};

export default meta;
