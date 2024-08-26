import { Meta, StoryObj } from "@storybook/react";

import { AvatarGroupDescriptionLoading } from "@/design-system/molecules/avatar-group-description/avatar-group-description.loading";

import { AvatarGroupDescriptionPort } from "./avatar-group-description.types";
import { AvatarGroupDescription } from "./variants/avatar-group-description-default";

type Story = StoryObj<typeof AvatarGroupDescription>;

const defaultProps: AvatarGroupDescriptionPort<"div"> = {
  avatarGroupProps: {
    avatars: [{}, {}, {}],
    size: "m",
  },
  labelProps: {
    children: "Label",
  },
};

const meta: Meta<typeof AvatarGroupDescription> = {
  component: AvatarGroupDescription,
  title: "Molecules/AvatarGroupDescription",
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
      source: { code: "<AvatarGroupDescription />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <AvatarGroupDescription {...defaultProps} />

        <AvatarGroupDescription
          {...defaultProps}
          descriptionProps={{
            children: "Description",
          }}
        />
      </div>
    );
  },
};

export const Loading: Story = {
  parameters: {
    docs: {
      source: { code: "<AvatarGroupDescriptionLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <AvatarGroupDescriptionLoading />
      </div>
    );
  },
};

export default meta;
