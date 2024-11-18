import { UserPublicInterface } from "@/core/domain/user/models/user-public-model";

import { TypoPort } from "@/design-system/atoms/typo";

export interface UserCardProps {
  title?: TypoPort<"span">;
  user?: Pick<UserPublicInterface, "avatarUrl" | "login" | "contacts">;
}
