import { Meta, StoryObj } from "@storybook/react";
import { CircleDashed } from "lucide-react";

import { AccordionLoading } from "./accordion.loading";
import { AccordionPort } from "./accordion.types";
import { Accordion } from "./variants/accordion-default";

type Story = StoryObj<typeof Accordion>;

const defaultPort: AccordionPort = {
  items: [
    {
      id: "id-1",
      titleProps: { children: "Label 1" },
      content: "Accordion content 1",
      startIcon: { component: CircleDashed },
      badgeProps: { children: 3 },
    },
    {
      id: "id-2",
      titleProps: { children: "Label 2" },
      badgeProps: { children: 3 },
      content: (
        <div className="flex flex-col gap-1">
          <p>Accordion content 1</p>
          <p>Accordion content 2</p>
        </div>
      ),
    },
    {
      id: "id-3",
      titleProps: { children: "Label 3" },
      startIcon: { component: CircleDashed },
      content: (
        <div className="flex flex-col gap-1">
          <p>Accordion content 1</p>
          <p>Accordion content 2</p>
        </div>
      ),
    },
    {
      id: "id-4",
      titleProps: { children: "Label 4" },
      content: (
        <div className="flex flex-col gap-1">
          <p>Accordion content 1</p>
          <p>Accordion content 2</p>
        </div>
      ),
    },
  ],
};

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  title: "Molecules/Accordion",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<Accordion />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full flex-col items-center gap-8">
        <Accordion {...defaultPort} {...args} />
      </div>
    );
  },
};

export const DefaultSelected: Story = {
  parameters: {
    docs: {
      source: { code: "<Accordion defaultSelected={['id-1']} />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Accordion {...defaultPort} {...args} defaultSelected={["id-1"]} />
      </div>
    );
  },
};

export const Multiple: Story = {
  parameters: {
    docs: {
      source: { code: "<Accordion multiple />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <Accordion {...defaultPort} {...args} multiple />
      </div>
    );
  },
};

export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<AccordionLoading />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <AccordionLoading />
      </div>
    );
  },
};

export default meta;
