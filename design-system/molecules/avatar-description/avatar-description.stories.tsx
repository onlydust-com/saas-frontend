import { Meta, StoryObj } from "@storybook/react";

import { AvatarDescriptionLoading } from "@/design-system/molecules/avatar-description/avatar-description.loading";

import { AvatarDescription } from "./variants/avatar-description-default";

type Story = StoryObj<typeof AvatarDescription>;

const meta: Meta<typeof AvatarDescription> = {
  component: AvatarDescription,
  title: "Molecules/AvatarDescription",
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
      source: { code: "<AvatarDescription />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <AvatarDescription
          {...args}
          avatarProps={{ shape: "square" }}
          labelProps={{ children: "Label" }}
          descriptionProps={{ children: "Description" }}
        />

        <AvatarDescription {...args} avatarProps={{ shape: "square" }} labelProps={{ children: "Label" }} />
      </div>
    );
  },
};

export const Loading: Story = {
  parameters: {
    docs: {
      source: { code: "<AvatarDescriptionLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <AvatarDescriptionLoading avatarShape={"square"} />
      </div>
    );
  },
};

export default meta;
