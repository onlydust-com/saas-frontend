import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type MeResponse = components["schemas"]["GetMeResponse"];

export interface MeInterface extends MeResponse {
  isMe(id: string): boolean;
}

export class Me implements MeInterface {
  avatarUrl!: MeResponse["avatarUrl"];
  createdAt!: MeResponse["createdAt"];
  email!: MeResponse["email"];
  firstName!: MeResponse["firstName"];
  githubUserId!: MeResponse["githubUserId"];
  hasAcceptedLatestTermsAndConditions!: MeResponse["hasAcceptedLatestTermsAndConditions"];
  hasCompletedOnboarding!: MeResponse["hasCompletedOnboarding"];
  hasCompletedVerificationInformation!: MeResponse["hasCompletedVerificationInformation"];
  id!: MeResponse["id"];
  isAdmin!: MeResponse["isAdmin"];
  isAuthorizedToApplyOnGithubIssues!: MeResponse["isAuthorizedToApplyOnGithubIssues"];
  lastName!: MeResponse["lastName"];
  login!: MeResponse["login"];
  missingPayoutPreference!: MeResponse["missingPayoutPreference"];
  pendingApplications!: MeResponse["pendingApplications"];
  pendingProjectsLed!: MeResponse["pendingProjectsLed"];
  projectsLed!: MeResponse["projectsLed"];
  sponsors!: MeResponse["sponsors"];
  programs!: MeResponse["programs"];

  constructor(props: MeResponse) {
    Object.assign(this, props);
  }

  isMe(id: string) {
    return this.id === id;
  }
}
