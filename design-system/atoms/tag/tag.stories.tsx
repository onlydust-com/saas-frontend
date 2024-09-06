import { Meta, StoryObj } from "@storybook/react";
import { CircleDashed } from "lucide-react";

import { TagLoading } from "@/design-system/atoms/tag/tag.loading";

import { TagAvatarPort, TagPort, TagSize } from "./tag.types";
import { Tag } from "./variants/tag-default";

type Story = StoryObj<typeof Tag>;

const defaultProps: TagPort<"div"> = {
  children: "Tag",
  classNames: {},
  htmlProps: {},
};

function mockFn() {
  return null;
}

const defaultIconProps: TagPort<"div"> = {
  ...defaultProps,
  startIcon: { component: CircleDashed },
};

const defaultAvatarProps: TagAvatarPort<"div"> = {
  ...defaultProps,
  avatar: { src: undefined },
};

const sizes: TagSize[] = ["xxs", "xs", "sm", "md"];

const meta: Meta<typeof Tag> = {
  component: Tag,
  title: "Atoms/Tag",
  tags: ["autodocs"],
  parameters: {
    docs: {
      source: { language: "tsx" },
    },
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Tag>Label</Tag>" },
    },
  },
  render: args => {
    return <Tag {...defaultProps} {...args} />;
  },
};

export const Sizes: Story = {
  parameters: {
    docs: {
      source: { code: "<Tag />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-start gap-5">
        {sizes.map(s => {
          return (
            <div key={s} className="flex flex-row items-start gap-3">
              <Tag {...defaultProps} {...args} size={s} />
              <Tag {...defaultIconProps} {...args} size={s} />
              <Tag {...defaultIconProps} {...args} size={s} onClose={mockFn} />
              <Tag {...defaultProps} {...args} size={s} onClose={mockFn} />
            </div>
          );
        })}
      </div>
    );
  },
};

export const WithAvatar: Story = {
  parameters: {
    docs: {
      source: { code: "<Tag avatar={{ }} />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-start gap-5">
        {sizes.map(s => {
          return (
            <div key={s} className="flex flex-row items-start gap-3">
              <Tag {...defaultAvatarProps} {...args} size={s} />
              <Tag {...defaultAvatarProps} {...args} size={s} onClose={mockFn} />
              <Tag {...defaultIconProps} {...defaultAvatarProps} {...args} size={s} />
              <Tag {...defaultIconProps} {...defaultAvatarProps} {...args} size={s} onClose={mockFn} />
            </div>
          );
        })}
      </div>
    );
  },
};

export const Selectable: Story = {
  parameters: {
    docs: {
      source: { code: "<Tag onSelect={() => {}} isSelected={true} />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-start gap-5">
        {sizes.map(s => {
          return (
            <div key={s} className="flex flex-row items-start gap-3">
              <Tag {...defaultProps} {...args} size={s} onSelect={mockFn} />
              <Tag {...defaultProps} {...args} size={s} onSelect={mockFn} isSelected={true} />
              <Tag {...defaultIconProps} {...args} size={s} onSelect={mockFn} />
              <Tag {...defaultIconProps} {...args} size={s} onClose={mockFn} onSelect={mockFn} />
              <Tag {...defaultProps} {...args} size={s} onClose={mockFn} onSelect={mockFn} />
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
      source: { code: "<TagLoading  />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full flex-col items-start gap-5">
        {sizes.map(s => {
          return <TagLoading size={s} key={s} />;
        })}
      </div>
    );
  },
};

export default meta;
