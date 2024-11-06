import { Meta, StoryObj } from "@storybook/react";
import { CircleDashed } from "lucide-react";

import { AvatarLoading } from "@/design-system/atoms/avatar/avatar.loading";

import { AvatarPort } from "./avatar.types";
import { Avatar } from "./variants/avatar-default";

type Story = StoryObj<typeof Avatar>;

const defaultProps: AvatarPort = {
  src: "",
};

const sizes: AvatarPort["size"][] = ["xxs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"];

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: "Atoms/Avatar",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Avatar />" },
    },
  },
  render: args => {
    return (
      <div className="w-full">
        <Avatar {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Rounded: Story = {
  parameters: {
    docs: {
      source: { code: "<Avatar />" },
    },
  },
  render: () => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-6">
          {sizes.map(size => (
            <Avatar key={size} {...defaultProps} size={size} />
          ))}
        </div>
        <div className="flex gap-6">
          {sizes.map(size => (
            <Avatar key={size} {...defaultProps} size={size} icon={{ src: "" }} />
          ))}
        </div>
        <div className="flex gap-6">
          {sizes.map(size => (
            <Avatar key={size} {...defaultProps} size={size} name="S" src={undefined} onlineIcon />
          ))}
        </div>
        <div className="flex gap-6">
          {sizes.map(size => (
            <Avatar key={size} {...defaultProps} size={size} src={undefined} iconProps={{ component: CircleDashed }} />
          ))}
        </div>
      </div>
    );
  },
};

export const Squared: Story = {
  parameters: {
    docs: {
      source: { code: "<Avatar shape='squared' />" },
    },
  },
  render: () => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-6">
          {sizes.map(size => (
            <Avatar key={size} {...defaultProps} size={size} shape="squared" />
          ))}
        </div>
        <div className="flex gap-6">
          {sizes.map(size => (
            <Avatar key={size} {...defaultProps} size={size} shape="squared" icon={{ src: "" }} />
          ))}
        </div>
        <div className="flex gap-6">
          {sizes.map(size => (
            <Avatar key={size} {...defaultProps} size={size} shape="squared" name="S" src={undefined} onlineIcon />
          ))}
        </div>
        <div className="flex gap-6">
          {sizes.map(size => (
            <Avatar
              key={size}
              {...defaultProps}
              size={size}
              shape="squared"
              src={undefined}
              iconProps={{ component: CircleDashed }}
            />
          ))}
        </div>
      </div>
    );
  },
};

export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<AvatarLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-6">
          {sizes.map(size => (
            <AvatarLoading key={size} size={size} shape="rounded" />
          ))}
        </div>
        <div className="flex gap-6">
          {sizes.map(size => (
            <AvatarLoading key={size} size={size} shape="squared" />
          ))}
        </div>
      </div>
    );
  },
};

export default meta;
