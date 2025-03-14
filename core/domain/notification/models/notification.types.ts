import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type NotificationResponse = components["schemas"]["NotificationPageItemResponse"];

export type NotificationActionPullRequestMerged = {
  type: "PULL_REQUEST_MERGED";
  projectSlug: string;
  projectId: string;
  contributionUuid: string;
  title: string;
  number: number;
};

export type NotificationAction = NotificationActionPullRequestMerged | undefined;

export interface NotificationInterface {
  getTitle(): string | undefined;
  getDescription(): string | undefined;
  hasRead(): boolean;
  getStatus(): NotificationResponse["status"];
  getUrl(): string | undefined;
  getId(): NotificationResponse["id"];
  getTimestamp(): NotificationResponse["timestamp"];
  getAction?(): NotificationAction;
  getType(): NotificationResponse["type"];
}
