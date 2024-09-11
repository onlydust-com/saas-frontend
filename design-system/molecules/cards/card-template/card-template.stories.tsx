import { Meta, StoryObj } from "@storybook/react";

import { CardTemplatePort } from "./card-template.types";
import { CardTemplate } from "./variants/card-template-default";

type Story = StoryObj<typeof CardTemplate>;

const defaultProps: CardTemplatePort<"div"> = {
  avatarProps: {
    src: "",
  },
  titleProps: {
    children: "Title",
  },
};

const meta: Meta<typeof CardTemplate> = {
  component: CardTemplate,
  title: "Molecules/Cards/CardTemplate",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<CardTemplate />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardTemplate {...defaultProps} />
      </div>
    );
  },
};

export default meta;
