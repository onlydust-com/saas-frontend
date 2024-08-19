import { Meta, StoryObj } from "@storybook/react";

import { DateRangePickerPort } from "./date-range-picker.types";
import { DateRangePicker } from "./variants/date-range-picker-default";

type Story = StoryObj<typeof DateRangePicker>;

const defaultProps: DateRangePickerPort = {};

const meta: Meta<typeof DateRangePicker> = {
  component: DateRangePicker,
  title: "Atoms/DateRangePicker",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#05051E" }],
    },
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<DateRangePicker />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <DateRangePicker {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
