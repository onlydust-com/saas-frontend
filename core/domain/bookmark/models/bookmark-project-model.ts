import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type BookMarkProjectResponse = components["schemas"]["ProjectLinkResponse"];

export interface BookMarkProjectInterface extends BookMarkProjectResponse {}

export class BookmarkProject implements BookMarkProjectInterface {
  id!: BookMarkProjectResponse["id"];
  logoUrl!: BookMarkProjectResponse["logoUrl"];
  name!: BookMarkProjectResponse["name"];
  slug!: BookMarkProjectResponse["slug"];

  constructor(props: BookMarkProjectResponse) {
    Object.assign(this, props);
  }
}
