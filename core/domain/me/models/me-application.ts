import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type MeApplicationsResponse = components["schemas"]["ApplicationsInfoResponse"];

export interface MeApplicationsInterface extends MeApplicationsResponse {
  maxApplicationsOnLiveHackathon: number;
  isMaxApplicationsOnLiveHackathonReached(): boolean;
}

const MAX_APPLICATIONS_ON_LIVE_HACKATHON = 10;

class MeApplications implements MeApplicationsInterface {
  applicationCountOnLiveHackathon!: MeApplicationsResponse["applicationCountOnLiveHackathon"];
  maxApplicationsOnLiveHackathon: number;
  constructor(props: MeApplicationsResponse) {
    Object.assign(this, props);
    this.maxApplicationsOnLiveHackathon = MAX_APPLICATIONS_ON_LIVE_HACKATHON;
  }

  isMaxApplicationsOnLiveHackathonReached() {
    return this.applicationCountOnLiveHackathon >= this.maxApplicationsOnLiveHackathon;
  }

  static getMaxApplicationsOnLiveHackathon() {
    return MAX_APPLICATIONS_ON_LIVE_HACKATHON;
  }
}

export { MeApplications };
