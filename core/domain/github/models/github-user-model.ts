import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type GithubUserResponse = components["schemas"]["GithubUserResponse"];

export interface GithubUserInterface extends GithubUserResponse {}

export class GithubUser implements GithubUserInterface {
  githubUserId!: GithubUserResponse["githubUserId"];
  login!: GithubUserResponse["login"];
  avatarUrl!: GithubUserResponse["avatarUrl"];

  constructor(props: GithubUserResponse) {
    Object.assign(this, props);
  }
}
