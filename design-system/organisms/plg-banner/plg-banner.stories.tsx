import { Meta, StoryObj } from "@storybook/react";

import { PlgBanner } from "./plg-banner";
import { PlgBannerProps } from "./plg-banner.types";

type Story = StoryObj<typeof PlgBanner>;

const defaultPort: PlgBannerProps = {
  title: "Title",
  subTitle: "SubTitle",
  date: "2024-08-08",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget",
  cta: {
    text: "CTA",
    href: "https://app.onlydust.com",
    icon: "ri-fire-line",
  },
};

const meta: Meta<typeof PlgBanner> = {
  component: PlgBanner,
  title: "Deprecated/Organisms/PlgBanner",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<PlgBanner />" },
    },
  },
  render: args => {
    return (
      <div className="flex h-[600px] w-[236px]">
        <PlgBanner {...defaultPort} {...args} />
      </div>
    );
  },
};

export default meta;
