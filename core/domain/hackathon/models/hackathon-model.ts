import { bootstrap } from "@/core/bootstrap";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type HackathonResponse = components["schemas"]["HackathonResponseV2"];

export interface HackathonInterface extends HackathonResponse {
  formatDisplayDates(): null | {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
  };
}

export class Hackathon implements HackathonInterface {
  availableIssueCount!: HackathonResponse["availableIssueCount"];
  communityLinks!: HackathonResponse["communityLinks"];
  description!: HackathonResponse["description"];
  endDate!: HackathonResponse["endDate"];
  id!: HackathonResponse["id"];
  index!: HackathonResponse["index"];
  issueCount!: HackathonResponse["issueCount"];
  links!: HackathonResponse["links"];
  location!: HackathonResponse["location"];
  projectCount!: HackathonResponse["projectCount"];
  slug!: HackathonResponse["slug"];
  startDate!: HackathonResponse["startDate"];
  subscriberCount!: HackathonResponse["subscriberCount"];
  title!: HackathonResponse["title"];

  constructor(props: HackathonResponse) {
    Object.assign(this, props);
  }

  protected dateKernelPort = bootstrap.getDateKernelPort();

  formatDisplayDates() {
    if (!this.startDate || !this.endDate) return null;

    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);

    return {
      startDate: this.dateKernelPort.format(startDate, "d MMM. yyyy"),
      endDate: this.dateKernelPort.format(endDate, "d MMM. yyyy"),
      startTime: this.dateKernelPort.format(startDate, "haa (OOO)"),
      endTime: this.dateKernelPort.format(endDate, "haa (OOO)"),
    };
  }
}
