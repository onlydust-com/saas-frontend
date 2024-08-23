import { Meta, StoryObj } from "@storybook/react";
import { ArrowUp, Clock } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { CardTemplateLoading } from "./card-template.loading";
import { CardTemplatePort } from "./card-template.types";
import { CardTemplate } from "./variants/card-template-default";

type Story = StoryObj<typeof CardTemplate>;

const defaultProps: CardTemplatePort<"div"> = {
  avatarProps: {
    src: undefined,
  },
  titleProps: {
    children: "Card Title",
  },
  descriptionProps: {
    children: "This is a description of the card.",
  },
};

const defaultPropsWithTags: CardTemplatePort<"div"> = {
  ...defaultProps,
  tags: [
    { children: "Tag 1" },
    {
      children: "Tag 2",
      icon: { component: Clock },
    },
    {
      children: "Tag 3",
      icon: { component: Clock },
    },
  ],
};

const meta: Meta<typeof CardTemplate> = {
  component: CardTemplate,
  title: "Molecules/Cards/CardTemplate",
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
      source: { code: "<CardTemplate />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardTemplate {...defaultProps} {...args} />
      </div>
    );
  },
};

export const WithIcon: Story = {
  parameters: {
    docs: {
      source: {
        code: "<CardTemplate iconProps={{ name: 'arrow-up', className: 'text-label-red' }} />",
      },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardTemplate
          {...defaultProps}
          {...args}
          iconProps={{
            component: ArrowUp,
            classNames: { base: "text-label-red" },
          }}
        />
      </div>
    );
  },
};

export const WithEndContent: Story = {
  parameters: {
    docs: {
      source: { code: "<CardTemplate endContent={<Button>Click me</Button>} />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardTemplate
          {...defaultProps}
          {...args}
          endContent={
            <Button variant="secondary-light" size="l">
              Click me
            </Button>
          }
        />
      </div>
    );
  },
};

export const WithCustomTags: Story = {
  parameters: {
    docs: {
      source: {
        code: "<CardTemplate tags={[{ children: 'Tag 1' }, { children: 'Tag 2', icon: { component: Clock } }, { children: 'Tag 3', icon: { component: Clock } }]} />",
      },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardTemplate {...defaultPropsWithTags} {...args} />
      </div>
    );
  },
};

export const Loading: Story = {
  parameters: {
    docs: {
      source: { code: "<CardTemplateLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-[345px] items-center gap-2">
        <CardTemplateLoading />
      </div>
    );
  },
};

export default meta;
