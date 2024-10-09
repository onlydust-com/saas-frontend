import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { ModalPort } from "./modal.types";
import { Modal } from "./variants/modal-default";

type Story = StoryObj<typeof Modal>;

const defaultProps: ModalPort<"div"> = {
  isOpen: false,
  titleProps: { children: "Modal title" },
  footer: {
    startContent: "Footer start",
    endContent: "Footer end",
  },
  children: <div className="min-h-[200px]">Modal content</div>,
  classNames: {},
  size: "9xl",
  background: "gradient",
};

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: "Molecules/Modal",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#0E0814" }],
    },
  },
};

export const Default: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open modal</Button>
        <Modal {...defaultProps} {...args} isOpen={isOpen} onOpenChange={setIsOpen} />
      </div>
    );
  },
};

export default meta;
