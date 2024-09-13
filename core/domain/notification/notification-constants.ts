import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type status = components["schemas"]["NotificationPageItemResponse"]["status"];

export const NotificationStatus: { [key in status]: key } = {
  READ: "READ",
  UNREAD: "UNREAD",
};
