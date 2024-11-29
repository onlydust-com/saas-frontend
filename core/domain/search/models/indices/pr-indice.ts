import { IndiceInterface } from "@/core/domain/search/models/indice.types";
import { PrIndice } from "@/core/domain/search/search-contract.types";

export class PullRequestIndice implements IndiceInterface {
  constructor(private pr: PrIndice) {}

  getId() {
    return this.pr._id;
  }

  getName() {
    return this.pr._source.repo_name;
  }

  getDescription() {
    return this.pr._source.title;
  }

  getTag() {
    return "Pull request";
  }

  isFilter() {
    return true;
  }

  getFilterValue() {
    return undefined;
  }
}
