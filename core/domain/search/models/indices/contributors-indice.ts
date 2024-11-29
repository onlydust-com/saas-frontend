import { IndiceInterface } from "@/core/domain/search/models/indice.types";
import { ContributorIndice } from "@/core/domain/search/search-contract.types";

export class ContributorsIndice implements IndiceInterface {
  constructor(private contributors: ContributorIndice) {}

  getId() {
    return this.contributors._id;
  }

  getName() {
    return this.contributors._source.contributor_login;
  }

  getDescription() {
    return undefined;
  }

  getTag() {
    return "contributors";
  }

  isFilter() {
    return false;
  }

  getFilterValue() {
    return undefined;
  }
}
