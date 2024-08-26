import { Meta, StoryObj } from "@storybook/react";

import { AvatarLabelGroupLoading } from "./avatar-label-group.loading";
import { AvatarLabelGroupPort } from "./avatar-label-group.types";
import { AvatarLabelGroup } from "./variants/avatar-label-group-default";

type Story = StoryObj<typeof AvatarLabelGroup>;

const defaultAvatars: AvatarLabelGroupPort<"div"> = {
  avatars: [{ src: "" }, { src: "" }, { src: "" }],
  title: "Group Title",
  description: "This is a description of the group.",
};

const sizes: AvatarLabelGroupPort<"div">["size"][] = ["md", "lg"];

const meta: Meta<typeof AvatarLabelGroup> = {
  component: AvatarLabelGroup,
  title: "Molecules/AvatarLabelGroup",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<AvatarLabelGroup />" },
    },
  },
  render: args => (
    <div className="flex flex-col gap-4">
      {sizes.map(size => (
        <AvatarLabelGroup key={size} {...defaultAvatars} {...args} size={size} />
      ))}
    </div>
  ),
};

export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<AvatarLabelGroupLoading />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-60 flex-col gap-4">
        {sizes.map(size => (
          <AvatarLabelGroupLoading key={size} {...defaultAvatars} {...args} size={size} />
        ))}
      </div>
    );
  },
};

export default meta;
