import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type MeOrganizationResponse = components["schemas"]["GithubOrganizationResponse"];

export interface MeOrganizationInterface extends MeOrganizationResponse {
  isUserAdminOfOrganization(): boolean;
}

export class MeOrganization implements MeOrganizationInterface {
  avatarUrl!: MeOrganizationResponse["avatarUrl"];
  githubAppInstallationPermissionsUpdateUrl!: MeOrganizationResponse["githubAppInstallationPermissionsUpdateUrl"];
  githubUserId!: MeOrganizationResponse["githubUserId"];
  htmlUrl!: MeOrganizationResponse["htmlUrl"];
  installationId!: MeOrganizationResponse["installationId"];
  installationStatus!: MeOrganizationResponse["installationStatus"];
  isCurrentUserAdmin!: MeOrganizationResponse["isCurrentUserAdmin"];
  isPersonal!: MeOrganizationResponse["isPersonal"];
  login!: MeOrganizationResponse["login"];
  name!: MeOrganizationResponse["name"];
  repos!: MeOrganizationResponse["repos"];

  constructor(props: MeOrganizationResponse) {
    Object.assign(this, props);
  }

  isUserAdminOfOrganization() {
    return this.isCurrentUserAdmin;
  }
}
