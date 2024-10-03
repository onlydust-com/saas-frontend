import { Meta, StoryObj } from "@storybook/react";

import { CardContributionKanbanPort } from "@/design-system/molecules/cards/card-contribution-kanban/card-contribution-kanban.types";
import { CardContributionKanban } from "@/design-system/molecules/cards/card-contribution-kanban/variants/card-contribution-kanban-default";

type Story = StoryObj<typeof CardContributionKanban>;

const defaultProps: CardContributionKanbanPort<"div"> = {};

const meta: Meta<typeof CardContributionKanban> = {
  component: CardContributionKanban,
  title: "Molecules/CardContributionKanban",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<CardContributionKanban />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardContributionKanban {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
