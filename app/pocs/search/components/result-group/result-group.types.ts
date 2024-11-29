import { IndiceInterface } from "@/core/domain/search/models/indice.types";
import { SearchIndice } from "@/core/domain/search/search-contract.types";

export interface ResultGroupProps {
  indice: SearchIndice;
  data?: Array<IndiceInterface | undefined>;
}
