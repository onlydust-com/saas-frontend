import { Meta, StoryObj } from "@storybook/react";

import { AvatarLabelSingleLoading } from "./avatar-label-single.loading";
import { AvatarLabelSinglePort } from "./avatar-label-single.types";
import { AvatarLabelSingle } from "./variants/avatar-label-single-default";

type Story = StoryObj<typeof AvatarLabelSingle>;

const defaultProps: AvatarLabelSinglePort<"div"> = {
  avatar: { src: "", name: "John Doe" },
  title: { children: "John Doe" },
  description: { children: "Software Engineer" },
};

const sizes: AvatarLabelSinglePort<"div">["size"][] = ["md", "lg"];

const meta: Meta<typeof AvatarLabelSingle> = {
  component: AvatarLabelSingle,
  title: "Molecules/AvatarLabelSingle",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<AvatarLabelSingle />" },
    },
  },
  render: args => (
    <div className="w-full">
      <AvatarLabelSingle {...defaultProps} {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      source: { code: "<AvatarLabelSingle />" },
    },
  },
  render: args => (
    <div className="flex flex-col gap-4">
      {sizes.map(size => (
        <AvatarLabelSingle key={size} {...defaultProps} {...args} size={size} />
      ))}
    </div>
  ),
};

export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<AvatarLabelSingleLoading />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-60 flex-col gap-4">
        {sizes.map(size => (
          <AvatarLabelSingleLoading key={size} {...args} size={size} />
        ))}
      </div>
    );
  },
};

export default meta;
