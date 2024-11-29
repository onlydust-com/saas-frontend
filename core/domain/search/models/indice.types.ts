import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type NotificationResponse = components["schemas"]["NotificationPageItemResponse"];

export interface IndiceInterface {
  getName(): string | undefined;
  getDescription(): string | undefined;
  getId(): NotificationResponse["id"];
  getTag: () => string;
  isFilter: () => boolean;
  getFilterValue: () => string | undefined;
}
