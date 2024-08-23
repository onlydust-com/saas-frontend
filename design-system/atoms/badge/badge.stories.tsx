import { Meta, StoryObj } from "@storybook/react";

import { BadgeLoading } from "@/design-system/atoms/badge/badge.loading";
import { BadgeAvatar } from "@/design-system/atoms/badge/variants/badge-avatar";
import { BadgeClose } from "@/design-system/atoms/badge/variants/badge-close";
import { BadgeIcon } from "@/design-system/atoms/badge/variants/badge-icon";
import { Icon } from "@/design-system/atoms/icon";

import { BadgeAvatarPort, BadgeClosePort, BadgeIconPort, BadgePort } from "./badge.types";
import { Badge } from "./variants/badge-default";

type Story = StoryObj<typeof Badge>;

const defaultProps: BadgePort<"div"> = {
  children: "Badge",
  classNames: {},
  htmlProps: {},
  isDeletable: true,
  isCloseItem: false,
  startContent: (
    <Icon
      name="ri-circle-line"
      size={12}
      classNames={{
        base: "text-inherit",
      }}
    />
  ),
};

const defaultBadgeIconProps: BadgeIconPort<"div"> = {
  ...defaultProps,
  startContent: undefined,
  icon: { name: "ri-fire-line" },
};

const defaultBadgeAvatarProps: BadgeAvatarPort<"div"> = {
  ...defaultProps,
  startContent: undefined,
  avatar: { src: undefined },
};

const defaultBadgeCloseProps: BadgeClosePort<"div"> = {
  ...defaultProps,
  onClose: () => {},
  isCloseItem: true,
};

const sizes = ["xxs", "xs", "sm", "md"] as const;
const shape = ["rounded", "squared"] as const;
const colors = ["grey", "brand", "error", "warning", "success"] as const;

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: "Atoms/Badge",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Badge />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Badge {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Rounded: Story = {
  parameters: {
    docs: {
      source: { code: "<Badge size='s' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex w-full items-start gap-8">
          {sizes.map(s => {
            return (
              <div key={s} className="flex flex-col items-start gap-2">
                <Badge {...defaultProps} {...args} size={"xxs"} shape="rounded" />
                <Badge {...defaultProps} {...args} size={"xs"} shape="rounded" />
                <Badge {...defaultProps} {...args} size={"sm"} shape="rounded" isDeletable={false} />
                <Badge {...defaultProps} {...args} size={"md"} shape="rounded" isDeletable={false} />
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};

export const Squared: Story = {
  parameters: {
    docs: {
      source: { code: "<Badge />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex w-full items-start gap-8">
          {sizes.map(s => {
            return (
              <div key={s} className="flex flex-col items-start gap-2">
                <Badge {...defaultProps} {...args} size={s} shape="squared" />
                <Badge {...defaultProps} {...args} size={s} shape="squared" />
                <Badge {...defaultProps} {...args} size={s} shape="squared" isDeletable={false} />
                <Badge {...defaultProps} {...args} size={s} shape="squared" isDeletable={false} />
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};

export const WithIcon: Story = {
  parameters: {
    docs: {
      source: { code: "<BadgeIcon icon={{ remixName: 'ri-fire-line' }} />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex w-full items-start gap-2">
          {shape.map(d => {
            return (
              <div key={d} className="flex w-full items-start gap-8">
                {sizes.map(s => {
                  return (
                    <div key={s} className="flex flex-col items-start gap-2">
                      <BadgeIcon {...defaultBadgeIconProps} {...args} size={s} shape={d} />
                      <BadgeIcon {...defaultBadgeIconProps} {...args} size={s} shape={d} />
                      <BadgeIcon {...defaultBadgeIconProps} {...args} size={s} shape={d} isDeletable={false} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};

export const WithAvatar: Story = {
  parameters: {
    docs: {
      source: { code: "<BadgeAvatar avatar={{ }} />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex w-full items-start gap-2">
          {shape.map(d => {
            return (
              <div key={d} className="flex w-full items-start gap-8">
                {sizes.map(s => {
                  return (
                    <div key={s} className="flex flex-col items-start gap-2">
                      <BadgeAvatar {...defaultBadgeAvatarProps} {...args} size={s} shape={d} />
                      <BadgeAvatar {...defaultBadgeAvatarProps} {...args} size={s} shape={d} />
                      <BadgeAvatar {...defaultBadgeAvatarProps} {...args} size={s} shape={d} isDeletable={false} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};

export const Close: Story = {
  parameters: {
    docs: {
      source: { code: "<BadgeClose onClose={() => {}} isCloseItem />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex w-full items-start gap-2">
          {shape.map(d => {
            return (
              <div key={d} className="flex w-full items-start gap-8">
                {sizes.map(s => {
                  return (
                    <div key={s} className="flex flex-col items-start gap-2">
                      <BadgeClose {...defaultBadgeCloseProps} {...args} size={s} shape={d} onClose={() => {}} />
                      <BadgeClose {...defaultBadgeCloseProps} {...args} size={s} shape={d} onClose={() => {}} />
                      <BadgeClose {...defaultBadgeCloseProps} {...args} size={s} shape={d} onClose={() => {}} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};

export const Colors: Story = {
  parameters: {
    docs: {
      source: { code: "<Badge color='grey' shape='rounded' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        {colors.map(c => {
          return (
            <div key={c} className="flex w-full items-center gap-2">
              {shape.map(s => {
                return <Badge key={`${c}-${s}`} {...defaultProps} {...args} color={c} shape={s} />;
              })}
            </div>
          );
        })}
      </div>
    );
  },
};

export const Clickable: Story = {
  parameters: {
    docs: {
      source: { code: "<Tag clickable={true} />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        {colors.map(c => {
          return (
            <div key={c} className="flex w-full items-center gap-2">
              {shape.map(s => {
                return <Badge key={`${c}-${s}`} {...defaultProps} {...args} clickable={true} color={c} shape={s} />;
              })}
            </div>
          );
        })}
      </div>
    );
  },
};

export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<BadgeLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-start gap-5">
        <div className="flex flex-col gap-2">
          <BadgeLoading size={"md"} />
          <BadgeLoading size={"md"} shape={"squared"} />
          <BadgeLoading size={"md"} />
          <BadgeLoading size={"md"} shape={"squared"} />
        </div>
        <div className="flex flex-col gap-2">
          <BadgeLoading size={"sm"} />
          <BadgeLoading size={"sm"} shape={"squared"} />
          <BadgeLoading size={"sm"} />
          <BadgeLoading size={"sm"} shape={"squared"} />
        </div>
        <div className="flex flex-col gap-2">
          <BadgeLoading size={"xs"} />
          <BadgeLoading size={"xs"} shape={"squared"} />
          <BadgeLoading size={"xs"} />
          <BadgeLoading size={"xs"} shape={"squared"} />
        </div>
        <div className="flex flex-col gap-2">
          <BadgeLoading size={"xxs"} />
          <BadgeLoading size={"xxs"} shape={"squared"} />
          <BadgeLoading size={"xxs"} />
          <BadgeLoading size={"xxs"} shape={"squared"} />
        </div>
      </div>
    );
  },
};

export default meta;
