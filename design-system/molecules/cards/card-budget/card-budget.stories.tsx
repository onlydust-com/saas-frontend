import { Meta, StoryObj } from "@storybook/react";

import { CardBudgetLoading } from "./card-budget.loading";
import { CardBudgetPort } from "./card-budget.types";
import { CardBudget } from "./variants/card-budget-default";

type Story = StoryObj<typeof CardBudget>;

const defaultProps: CardBudgetPort<"div"> = {
  amount: {
    value: 100000,
    currency: {
      id: "",
      code: "USDC",
      name: "USD Coin",
      logoUrl: undefined,
      decimals: 2,
    },
    usdEquivalent: 100000,
  },
  badgeContent: "75%",
};

const meta: Meta<typeof CardBudget> = {
  component: CardBudget,
  title: "Molecules/Cards/CardBudget",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<CardBudget />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardBudget {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Loading: Story = {
  parameters: {
    docs: {
      source: { code: "<CardBudgetLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-[345px] items-center gap-2">
        <CardBudgetLoading />
      </div>
    );
  },
};

export default meta;
