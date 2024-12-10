import { SearchRessourceType } from "@/core/domain/search/search-contract.types";

import { ResultMetricProps } from "../result-metric/result-metric.types";

export interface ResultTemplateProps {
  name?: string;
  description?: string;
  type: SearchRessourceType;
  tags?: string[];
  metrics?: ResultMetricProps[];
}
