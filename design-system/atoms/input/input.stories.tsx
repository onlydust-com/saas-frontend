import { Meta, StoryObj } from "@storybook/react";
import { CircleDashed } from "lucide-react";

import { InputLoading } from "@/design-system/atoms/input/input.loading";

import { InputPort, InputSize } from "./input.types";
import { Input } from "./variants/input-default";

type Story = StoryObj<typeof Input>;
const inputSize: InputSize[] = ["sm", "md", "lg"];
const defaultProps: InputPort = {
  placeholder: "placeholder",
};

const value = "Input value";

const withIconProps: InputPort = {
  ...defaultProps,
  startIcon: { component: CircleDashed },
};

const withAvatarProps: InputPort = {
  ...defaultProps,
  avatar: { src: "" },
};

const withInnerButton: InputPort = {
  ...defaultProps,
  button: { children: "Button", isTextButton: true, variant: "secondary", startIcon: { component: CircleDashed } },
};
const withOuterButton: InputPort = {
  ...defaultProps,
  button: { children: "Button", variant: "secondary", startIcon: { component: CircleDashed } },
};

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Atoms/Input",
  tags: ["autodocs"],
};

function InputTemplate(args: InputPort) {
  return <Input {...defaultProps} {...args} />;
}

function InputsTemplate(args: InputPort) {
  return (
    <div className="flex flex-row items-start gap-6">
      {inputSize.map(size => (
        <div className="flex w-full flex-col items-center gap-5" key={size}>
          <div className="flex w-full flex-col items-center gap-2">
            <InputTemplate {...args} size={size} />
            <InputTemplate {...args} size={size} value={value} />
            <InputTemplate {...args} size={size} attr={{ "data-hover": true }} />
            <InputTemplate {...args} size={size} isFocused={true} />
          </div>
          <div className="flex w-full flex-col items-center gap-2">
            <InputTemplate {...args} size={size} isError={true} />
            <InputTemplate {...args} size={size} isError={true} value={value} />
            <InputTemplate {...args} size={size} isError={true} attr={{ "data-hover": true }} />
            <InputTemplate {...args} size={size} isError={true} isFocused={true} />
          </div>
          <div className="flex w-full flex-col items-center gap-2">
            <InputTemplate {...args} size={size} isDisabled={true} />
          </div>
        </div>
      ))}
    </div>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Input />" },
    },
  },
  render: args => {
    return <InputsTemplate {...args} />;
  },
};

export const WithIcon: Story = {
  parameters: {
    docs: {
      source: { code: "<Input label='Input label' />" },
    },
  },
  render: () => {
    return <InputsTemplate {...withIconProps} />;
  },
};

export const withAvatar: Story = {
  parameters: {
    docs: {
      source: { code: "<Input label='Input label' />" },
    },
  },
  render: () => {
    return <InputsTemplate {...withAvatarProps} />;
  },
};
export const WithInnerButton: Story = {
  parameters: {
    docs: {
      source: { code: "<Input label='Input label' />" },
    },
  },
  render: () => {
    return <InputsTemplate {...withInnerButton} />;
  },
};

export const WithOuterButton: Story = {
  parameters: {
    docs: {
      source: { code: "<Input label='Input label' />" },
    },
  },
  render: () => {
    return <InputsTemplate {...withOuterButton} />;
  },
};

export const withLabel: Story = {
  parameters: {
    docs: {
      source: { code: "<Input label='Input label' />" },
    },
  },
  render: () => {
    return (
      <div className="flex flex-row items-start gap-6">
        <InputTemplate
          label={"label"}
          description={"Lorem ipsum dolor sit amet"}
          info={{ text: "Lorem ipsum dolor sit amet" }}
          error={{ text: "Lorem ipsum dolor sit amet" }}
        />
        <InputTemplate
          label={"label"}
          description={"Lorem ipsum dolor sit amet"}
          info={{ text: "Lorem ipsum dolor sit amet" }}
          error={{ text: "Lorem ipsum dolor sit amet" }}
          isError={true}
        />
      </div>
    );
  },
};

export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<InputLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-[348px] items-center gap-2">
        <InputLoading />
      </div>
    );
  },
};

export default meta;
