import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { DrawerPort } from "./drawer.types";
import { Drawer } from "./variants/drawer-default";

type Story = StoryObj<typeof Drawer>;

const defaultProps: DrawerPort<"div"> = {
  children: "DRAWER CONTENT",

  header: {
    startContent: <Typo size={"l"}>Header</Typo>,
    endContent: <Icon name={"ri-square-line"} size={16} />,
  },
  footer: {
    startContent: <Icon name={"ri-square-line"} size={16} />,
    endContent: <Icon name={"ri-square-line"} size={16} />,
  },
};

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  title: "Molecules/Drawer",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Drawer
  footer={{
    startContent: <div />,
    endContent: <div />
  }}
  header={{
    startContent: <div />,
    endContent: <div />
  }}
  trigger={<Button>Open Drawer</Button>}
>
  MODAL CONTENT
</Drawer>
      `,
      },
    },
  },
  render: args => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="flex w-full items-center gap-2">
        <Button onClick={() => setIsOpen(true)}>Open drawer</Button>
        <Drawer {...defaultProps} {...args} isOpen={isOpen} onOpenChange={setIsOpen} />
      </div>
    );
  },
};

export default meta;
