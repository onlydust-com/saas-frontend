import { PropsWithChildren } from "react";

import { BiContributorInterface } from "@/core/domain/bi/models/bi-contributor-model";

export interface KpiProps extends PropsWithChildren {
  user: BiContributorInterface;
}
