import { Meta, StoryObj } from "@storybook/react";

import { ImageInputPort } from "./image-input.types";
import { ImageInput } from "./variants/image-input-default";

type Story = StoryObj<typeof ImageInput>;

const defaultProps: ImageInputPort<"div"> = {
  name: "",
};

const meta: Meta<typeof ImageInput> = {
  component: ImageInput,
  title: "Molecules/ImageInput",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<ImageInput />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <ImageInput {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
