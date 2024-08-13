import { Meta, StoryObj } from "@storybook/react";

import { CardProjectDefaultAdapter } from "./adapters/default/default.adapter";
import { CardProjectLoading } from "./card-project.loading";
import { CardProjectPort } from "./card-project.types";

type Story = StoryObj<typeof CardProjectDefaultAdapter>;

const defaultProps: CardProjectPort<"div"> = {
  title: "Project Title",
  description: "This is a brief description of the project.",
  logoUrl: undefined,
  languages: [{ children: "Cairo" }],
  categories: [{ children: "Defi" }],
  buttonProps: {
    children: "See project",
  },
};

const meta: Meta<typeof CardProjectDefaultAdapter> = {
  component: CardProjectDefaultAdapter,
  title: "Molecules/Cards/CardProject",
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
      source: { code: "<CardProjectDefaultAdapter />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardProjectDefaultAdapter {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Loading: Story = {
  parameters: {
    docs: {
      source: { code: "<CardProjectLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-[345px] items-center gap-2">
        <CardProjectLoading />
      </div>
    );
  },
};

export default meta;
