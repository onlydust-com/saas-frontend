import { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { CardTemplateDefaultAdapter } from "./adapters/default/default.adapter";
import { CardTemplateLoading } from "./card-template.loading";
import { CardTemplatePort } from "./card-template.types";

type Story = StoryObj<typeof CardTemplateDefaultAdapter>;

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
      icon: {
        name: "ri-time-line",
      },
    },
    {
      children: "Tag 3",
      icon: {
        name: "ri-time-line",
      },
    },
  ],
};

const meta: Meta<typeof CardTemplateDefaultAdapter> = {
  component: CardTemplateDefaultAdapter,
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
      source: { code: "<CardTemplateDefaultAdapter />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardTemplateDefaultAdapter {...defaultProps} {...args} />
      </div>
    );
  },
};

export const WithIcon: Story = {
  parameters: {
    docs: {
      source: {
        code: "<CardTemplateDefaultAdapter iconProps={{ name: 'ri-arrow-up-line', className: 'text-label-red' }} />",
      },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardTemplateDefaultAdapter
          {...defaultProps}
          {...args}
          iconProps={{ name: "ri-arrow-up-line", className: "text-label-red" }}
        />
      </div>
    );
  },
};

export const WithEndContent: Story = {
  parameters: {
    docs: {
      source: { code: "<CardTemplateDefaultAdapter endContent={<Button>Click me</Button>} />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardTemplateDefaultAdapter
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
        code: "<CardTemplateDefaultAdapter tags={[{ children: 'Tag 1' }, { children: 'Tag 2', icon: { name: 'ri-time-line' } }, { children: 'Tag 3', icon: { name: 'ri-time-line' } }]} />",
      },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardTemplateDefaultAdapter {...defaultPropsWithTags} {...args} />
      </div>
    );
  },
};

export const Skeleton: Story = {
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
