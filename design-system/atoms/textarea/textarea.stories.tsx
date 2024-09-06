import { Meta, StoryObj } from "@storybook/react";

import { Textarea, TextareaPort } from "./index";

type Story = StoryObj<typeof Textarea>;

const defaultProps: TextareaPort = {
  name: "textarea",
  placeholder: "placeholder",
};

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: "Atoms/Textarea",
  tags: ["autodocs"],
};

function TextareaTemplate(args: TextareaPort) {
  return <Textarea {...defaultProps} {...args} />;
}

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Textarea />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-[348px] flex-col items-center gap-2">
        <TextareaTemplate {...defaultProps} {...args} />
        <TextareaTemplate {...defaultProps} {...args} value={"Textarea text"} />
        <TextareaTemplate {...defaultProps} {...args} isDisabled={true} />
        <TextareaTemplate {...defaultProps} {...args} isError={true} />
      </div>
    );
  },
};

export const withLabel: Story = {
  parameters: {
    docs: {
      source: { code: "<Textarea label='Input label' />" },
    },
  },
  render: () => {
    return (
      <div className="flex flex-row items-start gap-6">
        <TextareaTemplate
          label={"label"}
          description={"Lorem ipsum dolor sit amet"}
          info={{ text: "Lorem ipsum dolor sit amet" }}
          error={{ text: "Lorem ipsum dolor sit amet" }}
        />
        <TextareaTemplate
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

export default meta;
