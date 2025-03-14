import { Notification } from "@/core/domain/notification/models/notification-model";
import {
  NotificationActionPullRequestMerged,
  NotificationInterface,
} from "@/core/domain/notification/models/notification.types";
import { NotificationStatus } from "@/core/domain/notification/notification-constants";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export class ContributorPullRequestMerged implements NotificationInterface {
  data: components["schemas"]["NotificationContributorPullRequestMerged"] | undefined;
  constructor(private notification: Notification) {
    this.data = notification.data.contributorPullRequestMerged;
  }

  getType() {
    return this.notification.type;
  }

  getId() {
    return this.notification.id;
  }

  getTimestamp() {
    return this.notification.timestamp;
  }

  getStatus() {
    return this.notification.status;
  }

  hasRead() {
    return this.notification.status === NotificationStatus.READ;
  }

  getTitle() {
    const { projectSlug } = this.data || {};
    return `Your pull request in ${projectSlug} has been merged`;
  }

  getDescription() {
    return "Take time to fill out the survey to help us improve the project.";
  }

  getUrl() {
    return undefined;
  }

  getAction(): NotificationActionPullRequestMerged {
    return {
      type: "PULL_REQUEST_MERGED",
      projectSlug: this.data?.projectSlug ?? "",
      projectId: this.data?.projectId ?? "",
      contributionUuid: this.data?.contributionUuid ?? "",
      title: this.data?.title ?? "",
      number: this.data?.number ?? 0,
    };
  }
}
