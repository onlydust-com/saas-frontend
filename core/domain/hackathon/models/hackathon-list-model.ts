import { bootstrap } from "@/core/bootstrap";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { HackathonStatus } from "./hackathon.types";

export type HackathonsListResponse = components["schemas"]["HackathonsListItemResponse"];

export interface HackathonsListInterface extends HackathonsListResponse {
  isComingSoon(): boolean;
  isLive(): boolean;
  isPast(): boolean;
  getStatus(): HackathonStatus;
  formatDisplayDates(): {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
  };
  getBackgroundImage(): string;
}

export class HackathonsList implements HackathonsListInterface {
  endDate!: HackathonsListResponse["endDate"];
  githubLabels!: HackathonsListResponse["githubLabels"];
  id!: HackathonsListResponse["id"];
  index!: HackathonsListResponse["index"];
  issueCount!: HackathonsListResponse["issueCount"];
  location!: HackathonsListResponse["location"];
  openIssueCount!: HackathonsListResponse["openIssueCount"];
  projects!: HackathonsListResponse["projects"];
  slug!: HackathonsListResponse["slug"];
  startDate!: HackathonsListResponse["startDate"];
  subscriberCount!: HackathonsListResponse["subscriberCount"];
  title!: HackathonsListResponse["title"];

  constructor(props: HackathonsListResponse) {
    Object.assign(this, props);
  }

  protected dateKernelPort = bootstrap.getDateKernelPort();

  isComingSoon() {
    return this.dateKernelPort.isFuture(new Date(this.startDate));
  }

  isLive() {
    return this.dateKernelPort.isPast(new Date(this.startDate)) && this.dateKernelPort.isFuture(new Date(this.endDate));
  }

  isPast() {
    return this.dateKernelPort.isPast(new Date(this.endDate));
  }

  getStatus() {
    if (this.isLive()) {
      return "live";
    }

    if (this.isComingSoon()) {
      return "open";
    }

    return "closed";
  }

  formatDisplayDates() {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);

    return {
      startDate: this.dateKernelPort.format(startDate, "d MMM, yyyy"),
      endDate: this.dateKernelPort.format(endDate, "d MMM, yyyy"),
      startTime: this.dateKernelPort.format(startDate, "Kaa (OOO)"),
      endTime: this.dateKernelPort.format(endDate, "Kaa (OOO)"),
    };
  }

  getBackgroundImage() {
    const NB_AVAILABLE_BACKGROUNDS = 16;

    let backgroundIndex = this.index;

    if (backgroundIndex >= NB_AVAILABLE_BACKGROUNDS) {
      backgroundIndex = backgroundIndex % NB_AVAILABLE_BACKGROUNDS;
    }

    return `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/cover-${backgroundIndex + 1}.png`;
  }
}
