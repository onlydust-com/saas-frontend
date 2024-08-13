import { Meta, StoryObj } from "@storybook/react";

import { CardBudgetDefaultAdapter } from "./adapters/default/default.adapter";
import { CardBudgetLoading } from "./card-budget.loading";
import { CardBudgetPort } from "./card-budget.types";

type Story = StoryObj<typeof CardBudgetDefaultAdapter>;

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
  budgetPercentage: 75,
};

const meta: Meta<typeof CardBudgetDefaultAdapter> = {
  component: CardBudgetDefaultAdapter,
  title: "Molecules/Cards/CardBudget",
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
      source: { code: "<CardBudgetDefaultAdapter />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardBudgetDefaultAdapter {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Skeleton: Story = {
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
