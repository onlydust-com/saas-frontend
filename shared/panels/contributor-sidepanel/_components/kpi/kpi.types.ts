import { PropsWithChildren } from "react";

import { UserPublicInterface } from "@/core/domain/user/models/user-public-model";

export interface KpiProps extends PropsWithChildren {
  user: UserPublicInterface;
}
