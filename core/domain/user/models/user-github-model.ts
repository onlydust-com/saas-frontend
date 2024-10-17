import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type UserGithubResponse = components["schemas"]["GithubUserResponse"];

export interface UserGithubInterface extends UserGithubResponse {}

export class UserGithub implements UserGithubInterface {
  githubUserId!: UserGithubResponse["githubUserId"];
  login!: UserGithubResponse["login"];
  avatarUrl!: UserGithubResponse["avatarUrl"];

  constructor(props: UserGithubResponse) {
    Object.assign(this, props);
  }
}
