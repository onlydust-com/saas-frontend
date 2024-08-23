import { Meta, StoryObj } from "@storybook/react";

import { BadgeClose } from "@/design-system/atoms/badge-close/variants/badge-close-default";

import { BadgeClosePort } from "./badge.types";

type Story = StoryObj<typeof BadgeClose>;

const defaultProps: BadgeClosePort<"div"> = {
  classNames: {},
  htmlProps: {},
  onClose: () => {},
  shape: "rounded",
  color: "grey",
};

const shape = ["rounded", "squared"] as const;
const colors = ["grey", "brand", "error", "warning", "success"] as const;

const meta: Meta<typeof BadgeClose> = {
  component: BadgeClose,
  title: "Atoms/BadgeClose",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<BadgeClose />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <BadgeClose {...defaultProps} {...args} />
      </div>
    );
  },
};

export const Rounded: Story = {
  parameters: {
    docs: {
      source: { code: "<BadgeClose shape='rounded' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <BadgeClose {...defaultProps} {...args} shape={"rounded"} />
      </div>
    );
  },
};

export const Squared: Story = {
  parameters: {
    docs: {
      source: { code: "<BadgeClose shape='squared' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <BadgeClose {...defaultProps} {...args} shape={"squared"} />
      </div>
    );
  },
};

export const Colors: Story = {
  parameters: {
    docs: {
      source: { code: "<BadgeClose color='grey' shape='rounded' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        {colors.map(c => {
          return (
            <div key={c} className="flex w-full items-center gap-2">
              {shape.map(s => {
                return <BadgeClose key={`${c}-${s}`} {...defaultProps} {...args} color={c} shape={s} />;
              })}
            </div>
          );
        })}
      </div>
    );
  },
};

// export const Skeleton: Story = {
//   parameters: {
//     docs: {
//       source: { code: "<BadgeLoading />" },
//     },
//   },
//   render: () => {
//     return (
//       <div className="flex w-full items-start gap-5">
//         <div className="flex flex-col gap-2">
//           <BadgeLoading size={"md"} />
//           <BadgeLoading size={"md"} shape={"squared"} />
//           <BadgeLoading size={"md"} />
//           <BadgeLoading size={"md"} shape={"squared"} />
//         </div>
//         <div className="flex flex-col gap-2">
//           <BadgeLoading size={"sm"} />
//           <BadgeLoading size={"sm"} shape={"squared"} />
//           <BadgeLoading size={"sm"} />
//           <BadgeLoading size={"sm"} shape={"squared"} />
//         </div>
//         <div className="flex flex-col gap-2">
//           <BadgeLoading size={"xs"} />
//           <BadgeLoading size={"xs"} shape={"squared"} />
//           <BadgeLoading size={"xs"} />
//           <BadgeLoading size={"xs"} shape={"squared"} />
//         </div>
//         <div className="flex flex-col gap-2">
//           <BadgeLoading size={"xxs"} />
//           <BadgeLoading size={"xxs"} shape={"squared"} />
//           <BadgeLoading size={"xxs"} />
//           <BadgeLoading size={"xxs"} shape={"squared"} />
//         </div>
//       </div>
//     );
//   },
// };

export default meta;
