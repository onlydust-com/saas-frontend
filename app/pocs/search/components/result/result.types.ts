import { PropsWithChildren } from "react";

import { IndiceInterface } from "@/core/domain/search/models/indice.types";

export interface ResultProps extends PropsWithChildren {
  data?: IndiceInterface;
}
