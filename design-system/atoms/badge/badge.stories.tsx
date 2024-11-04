import { Meta, StoryObj } from "@storybook/react";
import { Flame } from "lucide-react";

import { BadgeLoading } from "@/design-system/atoms/badge/badge.loading";
import { BadgeAvatar } from "@/design-system/atoms/badge/variants/badge-avatar";
import { BadgeIcon } from "@/design-system/atoms/badge/variants/badge-icon";

import { BadgeAvatarPort, BadgeIconPort, BadgePort } from "./badge.types";
import { Badge } from "./variants/badge-default";

type Story = StoryObj<typeof Badge>;

const defaultProps: BadgePort<"div"> = {
  children: "Badge",
  classNames: {},
  htmlProps: {},
  isDeletable: false,
  icon: { component: Flame },
};

const defaultBadgeIconProps: BadgeIconPort<"div"> = {
  ...defaultProps,
  startContent: undefined,
  icon: { component: Flame },
};

const defaultBadgeAvatarProps: BadgeAvatarPort<"div"> = {
  ...defaultProps,
  startContent: undefined,
  avatar: { src: undefined },
};

const defaultBadgeCloseProps: BadgePort<"div"> = {
  ...defaultProps,
  isDeletable: true,
};

const sizes = ["xxs", "xs", "sm", "md", "lg", "xl"] as const;
const variant = ["flat", "solid", "outline"] as const;
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
        <div className="flex w-full items-start gap-2">
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
        <div className="flex w-full items-start gap-2">
          {sizes.map(s => {
            return (
              <div key={s} className="flex flex-col items-start gap-2">
                <Badge {...defaultProps} {...args} size={s} shape="squared" />
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
      source: { code: "<BadgeIcon icon={{ component: Flame }} />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex w-full items-start gap-2">
          {shape.map(d => {
            return (
              <div key={d} className="flex w-full items-start gap-2">
                {sizes.map(s => {
                  return (
                    <div key={s} className="flex flex-col items-start gap-2">
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
              <div key={d} className="flex w-full items-start gap-2">
                {sizes.map(s => {
                  return (
                    <div key={s} className="flex flex-col items-start gap-2">
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
              {variant.map(v => (
                <>
                  {shape.map(s => {
                    return <Badge key={`${c}-${s}-${v}`} {...defaultProps} {...args} color={c} shape={s} variant={v} />;
                  })}
                </>
              ))}
            </div>
          );
        })}
        <div className="flex w-full items-center gap-2">
          <Badge
            {...defaultProps}
            {...args}
            color={"inverse"}
            shape={"rounded"}
            variant={"solid"}
            classNames={{ base: "opacity-0" }}
          />
          <Badge
            {...defaultProps}
            {...args}
            color={"inverse"}
            shape={"rounded"}
            variant={"solid"}
            classNames={{ base: "opacity-0" }}
          />
          <Badge {...defaultProps} {...args} color={"inverse"} shape={"rounded"} variant={"solid"} />
          <Badge {...defaultProps} {...args} color={"inverse"} shape={"squared"} variant={"solid"} />
        </div>
      </div>
    );
  },
};

export const Deletable: Story = {
  parameters: {
    docs: {
      source: { code: "<Tag clickable={true} />" },
    },
  },
  render: args => {
    return (
      <div className="flex flex-col items-center gap-2">
        {colors.map(c => {
          return (
            <div key={c} className="flex flex-col items-start gap-2 px-2">
              {shape.map(d => {
                return (
                  <div key={d} className="flex items-start gap-2">
                    {variant.map(v => (
                      <>
                        {sizes.map(s => {
                          return (
                            <div key={s} className="flex flex-col items-start gap-2">
                              <Badge
                                {...defaultBadgeCloseProps}
                                {...args}
                                size={s}
                                shape={d}
                                color={c}
                                isDeletable
                                variant={v}
                              />
                            </div>
                          );
                        })}
                      </>
                    ))}
                  </div>
                );
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
          <BadgeLoading size={"xxs"} />
          <BadgeLoading size={"xxs"} shape={"squared"} />
        </div>
        <div className="flex flex-col gap-2">
          <BadgeLoading size={"xs"} />
          <BadgeLoading size={"xs"} shape={"squared"} />
        </div>
        <div className="flex flex-col gap-2">
          <BadgeLoading size={"sm"} />
          <BadgeLoading size={"sm"} shape={"squared"} />
        </div>
        <div className="flex flex-col gap-2">
          <BadgeLoading size={"md"} />
          <BadgeLoading size={"md"} shape={"squared"} />
        </div>
      </div>
    );
  },
};

export default meta;
