import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { CardNotificationDefaultAdapter } from "../adapters/default/default.adapter";
import { CardNotificationPort } from "../card-notification.types";

export function CardNotification(props: CardNotificationPort) {
  return withComponentAdapter<CardNotificationPort>(CardNotificationDefaultAdapter)(props);
}
