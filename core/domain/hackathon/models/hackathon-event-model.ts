import { bootstrap } from "@/core/bootstrap";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { HackathonEventStatus } from "./hackathon.types";

export type HackathonsEventsResponse = components["schemas"]["HackathonsEventItemResponse"];

export interface HackathonsEventsInterface extends HackathonsEventsResponse {
  isToday(): boolean;
  isAfterToday(): boolean;
  isBeforeToday(): boolean;
  isLive(): boolean;
  getFormattedTime(): string;
  getStatus(): HackathonEventStatus;
}

export class HackathonsEvents implements HackathonsEventsInterface {
  name!: HackathonsEventsResponse["name"];
  subtitle!: HackathonsEventsResponse["subtitle"];
  iconSlug!: HackathonsEventsResponse["iconSlug"];
  startDate!: HackathonsEventsResponse["startDate"];
  endDate!: HackathonsEventsResponse["endDate"];
  links!: HackathonsEventsResponse["links"];

  constructor(props: HackathonsEventsResponse) {
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

  getStatus() {
    if (this.isLive()) {
      return "highlight";
    }

    if (this.dateKernelPort.isPast(new Date(this.endDate))) {
      return "terminated";
    }

    return "planned";
  }
}
