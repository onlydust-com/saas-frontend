import { Meta, StoryObj } from "@storybook/react";

import { CardNotificationPort } from "./card-notification.types";
import { CardNotification } from "./variants/card-notification-default";

type Story = StoryObj<typeof CardNotification>;

const defaultProps: CardNotificationPort = {
  titleProps: {
    children: "Notification title",
  },
  descriptionProps: {
    children: "Notification description",
  },
  hasRead: false,
  onClick: () => {
    alert("Notification clicked");
  },
};

const meta: Meta<typeof CardNotification> = {
  component: CardNotification,
  title: "Molecules/Cards/CardNotification",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<CardNotification />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardNotification {...defaultProps} />
      </div>
    );
  },
};

export default meta;
