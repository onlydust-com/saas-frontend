import { bootstrap } from "@/core/bootstrap";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { HackathonEventStatus } from "./hackathon.types";

export type HackathonEventResponse = components["schemas"]["HackathonsEventItemResponse"];

export interface HackathonEventInterface extends HackathonEventResponse {
  isToday(): boolean;
  isAfterToday(): boolean;
  isBeforeToday(): boolean;
  isLive(): boolean;
  getFormattedTime(): string;
  getStatus(): HackathonEventStatus;
}

export class HackathonEvent implements HackathonEventInterface {
  name!: HackathonEventResponse["name"];
  subtitle!: HackathonEventResponse["subtitle"];
  iconSlug!: HackathonEventResponse["iconSlug"];
  startDate!: HackathonEventResponse["startDate"];
  endDate!: HackathonEventResponse["endDate"];
  links!: HackathonEventResponse["links"];

  constructor(props: HackathonEventResponse) {
    Object.assign(this, props);
  }

  protected dateKernelPort = bootstrap.getDateKernelPort();

  isToday(): boolean {
    const eachDays = this.dateKernelPort.eachDayOfInterval(new Date(this.startDate), new Date(this.endDate));

    return eachDays.some(day => this.dateKernelPort.isToday(day));
  }

  isAfterToday(): boolean {
    return !this.isToday() && this.dateKernelPort.isFuture(new Date(this.startDate));
  }

  isBeforeToday(): boolean {
    return !this.isToday() && this.dateKernelPort.isPast(new Date(this.endDate));
  }

  isLive(): boolean {
    return this.dateKernelPort.isPast(new Date(this.startDate)) && this.dateKernelPort.isFuture(new Date(this.endDate));
  }

  getFormattedTime(): string {
    return this.dateKernelPort.format(new Date(this.startDate), "hh aa OOO");
  }

  getStatus(): HackathonEventStatus {
    if (this.isLive()) {
      return HackathonEventStatus.Highlight;
    }

    if (this.dateKernelPort.isPast(new Date(this.endDate))) {
      return HackathonEventStatus.Terminated;
    }

    return HackathonEventStatus.Planned;
  }
}
