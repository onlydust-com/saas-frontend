import { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "@/design-system/atoms/avatar";

import { CardTransactionLoading } from "./card-transaction.loading";
import { CardTransactionPort } from "./card-transaction.types";
import { CardTransaction } from "./variants/card-transaction-default";

type Story = StoryObj<typeof CardTransaction>;

const defaultProps: CardTransactionPort<"div"> = {
  status: "granted",
  date: new Date(),
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

const meta: Meta<typeof CardTransaction> = {
  component: CardTransaction,
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

export const GrantedStatus: Story = {
  parameters: {
    docs: {
      source: {
        code: "<CardTransaction status='granted' />",
      },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardTransaction {...defaultProps} {...args} status="granted" />
      </div>
    );
  },
};

export const AllocatedStatus: Story = {
  parameters: {
    docs: {
      source: {
        code: "<CardTransaction status='allocated' />",
      },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardTransaction {...defaultProps} {...args} status="allocated" />
      </div>
    );
  },
};

export const ReturnedStatus: Story = {
  parameters: {
    docs: {
      source: {
        code: "<CardTransaction status='returned' />",
      },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardTransaction {...defaultProps} {...args} status="returned" />
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
