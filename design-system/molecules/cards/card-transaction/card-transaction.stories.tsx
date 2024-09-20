import { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "@/design-system/atoms/avatar";

import { CardTransactionLoading } from "./card-transaction.loading";
import { CardTransactionPort } from "./card-transaction.types";
import { CardTransaction } from "./variants/card-transaction-default";

type Story = StoryObj<typeof CardTransaction>;

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
    startContent: <Avatar src={undefined} size="xs" shape="squared" />,
    children: "Project",
  },
};

const meta: Meta<typeof CardTransaction> = {
  component: CardTransaction,
  title: "Molecules/Cards/CardTransaction",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<CardTransaction />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardTransaction {...defaultProps} {...args} />
      </div>
    );
  },
};

export const GrantedType: Story = {
  parameters: {
    docs: {
      source: {
        code: "<CardTransaction type='GRANTED' />",
      },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardTransaction {...defaultProps} {...args} type="GRANTED" />
      </div>
    );
  },
};

export const ReceivedType: Story = {
  parameters: {
    docs: {
      source: {
        code: "<CardTransaction type='UNGRANTED' />",
      },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardTransaction {...defaultProps} {...args} type="UNGRANTED" />
      </div>
    );
  },
};

export const ReturnedType: Story = {
  parameters: {
    docs: {
      source: {
        code: "<CardTransaction type='UNALLOCATED' />",
      },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardTransaction {...defaultProps} {...args} type="UNALLOCATED" />
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
