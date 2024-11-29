import { IndiceInterface } from "@/core/domain/search/models/indice.types";
import { EcosystemIndice } from "@/core/domain/search/search-contract.types";

export class EcosystemsIndice implements IndiceInterface {
  constructor(private ecosystems: EcosystemIndice) {}

  getId() {
    return this.ecosystems._id;
  }

  getName() {
    return this.ecosystems._source.name;
  }

  getDescription() {
    return undefined;
  }

  getTag() {
    return "ecosystems";
  }

  isFilter() {
    return true;
  }

  getFilterValue() {
    return this.ecosystems._source.name;
  }
}
