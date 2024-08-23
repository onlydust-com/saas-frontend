import { Meta, StoryObj } from "@storybook/react";

import { TypoPort } from "./typo.types";
import { Typo } from "./variants/typo-default";

type Story = StoryObj<typeof Typo>;

const defaultProps: TypoPort<"span"> = {
  children: "Lorem ipsum dollor",
};

const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

const meta: Meta<typeof Typo> = {
  component: Typo,
  title: "Atoms/Typo",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#0E0814" }],
    },
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Typo />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full flex-col gap-2">
        {sizes.map(size => (
          <div key={size} className="flex w-full flex-row gap-2">
            <Typo size={size}>{size} - </Typo>
            <Typo {...defaultProps} size={size} color={"warning"} />
          </div>
        ))}
      </div>
    );
  },
};

export const Heading: Story = {
  parameters: {
    docs: {
      source: { code: "<Typo variant='heading' />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full flex-col gap-2">
        {sizes.map(size => (
          <div key={size} className="flex w-full flex-row gap-2">
            <Typo size={size} variant="heading">
              {size} -{" "}
            </Typo>
            <Typo {...defaultProps} variant="heading" size={size} />
          </div>
        ))}
      </div>
    );
  },
};

export default meta;
