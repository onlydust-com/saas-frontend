import { Meta, StoryObj } from "@storybook/react";

import { AvatarGroupLoading } from "./avatar-group.loading";
import { AvatarGroupPort } from "./avatar-group.types";
import { AvatarGroup } from "./variants/avatar-group-default";

type Story = StoryObj<typeof AvatarGroup>;

const defaultAvatars: AvatarGroupPort<"div"> = {
  avatars: [{ src: "" }, { src: "" }, { src: "" }, { src: "" }, { src: "" }],
};

const sizes: AvatarGroupPort<"div">["size"][] = ["xs", "sm", "md"];

const meta: Meta<typeof AvatarGroup> = {
  component: AvatarGroup,
  title: "Molecules/AvatarGroup",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<AvatarGroup />" },
    },
  },
  render: args => (
    <div className="w-full">
      <AvatarGroup {...defaultAvatars} {...args} />
    </div>
  ),
};

export const LimitedAvatars: Story = {
  parameters: {
    docs: {
      source: { code: "<AvatarGroup quantity={3} />" },
    },
  },
  render: args => (
    <div className="flex flex-col gap-4">
      {sizes.map(size => (
        <AvatarGroup key={size} {...defaultAvatars} {...args} size={size} quantity={3} />
      ))}
    </div>
  ),
};

export const WithOutsideBorder: Story = {
  parameters: {
    docs: {
      source: { code: "<AvatarGroup outsideBorder />" },
    },
  },
  render: args => (
    <div className="flex flex-col gap-4">
      {sizes.map(size => (
        <AvatarGroup key={size} {...defaultAvatars} {...args} size={size} quantity={3} outsideBorder />
      ))}
    </div>
  ),
};

export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<AvatarGroupLoading />" },
    },
  },
  render: args => {
    return (
      <div className="flex flex-col gap-4">
        {sizes.map(size => (
          <AvatarGroupLoading key={size} {...defaultAvatars} {...args} size={size} />
        ))}
      </div>
    );
  },
};

export default meta;
