import { PropsWithChildren } from "react";

import { SearchRessourceType } from "@/core/domain/search/models/search.types";

export interface SearchResultGroupProps extends PropsWithChildren {
  type: SearchRessourceType;
  border?: boolean;
}
