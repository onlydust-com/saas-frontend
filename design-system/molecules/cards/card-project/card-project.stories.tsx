import { Meta, StoryObj } from "@storybook/react";

import { CardProjectLoading } from "./card-project.loading";
import { CardProjectPort } from "./card-project.types";
import { CardProject } from "./variants/card-project-default";

type Story = StoryObj<typeof CardProject>;

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

const meta: Meta<typeof CardProject> = {
  component: CardProject,
  title: "Deprecated/Molecules/Cards/CardProject",
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
      source: { code: "<CardProject />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardProject {...defaultProps} {...args} />
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
