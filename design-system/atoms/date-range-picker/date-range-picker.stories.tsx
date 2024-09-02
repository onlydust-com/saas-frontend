import { Meta, StoryObj } from "@storybook/react";

import { DateRangePickerLoading } from "./date-range-picker.loading";
import { DateRangePickerPort } from "./date-range-picker.types";
import { DateRangePicker } from "./variants/date-range-picker-default";

type Story = StoryObj<typeof DateRangePicker>;

const defaultProps: DateRangePickerPort = {
  value: {
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 7)),
  },
};

const meta: Meta<typeof DateRangePicker> = {
  component: DateRangePicker,
  title: "Atoms/DateRangePicker",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<DateRangePicker />" },
    },
  },
  render: args => {
    return (
      <div className="w-[348px]">
        <DateRangePicker {...defaultProps} {...args} />
      </div>
    );
  },
};

export const WithLabel: Story = {
  parameters: {
    docs: {
      source: { code: "<DateRangePicker label='Select Date Range' />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-[348px] items-center gap-2">
        <DateRangePicker {...defaultProps} {...args} label="Select Date Range" />
      </div>
    );
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: { code: "<DateRangePicker isDisabled={true} />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-[348px] items-center gap-2">
        <DateRangePicker {...defaultProps} isDisabled={true} />
      </div>
    );
  },
};

export const Invalid: Story = {
  parameters: {
    docs: {
      source: { code: "<DateRangePicker isError={true} />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-[348px] items-center gap-2">
        <DateRangePicker {...defaultProps} isError={true} />
      </div>
    );
  },
};

export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<DateRangePickerLoading />" },
    },
  },
  render: () => {
    return (
      <div className="w-[348px]">
        <DateRangePickerLoading />
      </div>
    );
  },
};

export default meta;
