import { IndiceInterface } from "@/core/domain/search/models/indice.types";
import { IssueIndice } from "@/core/domain/search/search-contract.types";

export class IssuesIndice implements IndiceInterface {
  constructor(private issue: IssueIndice) {}

  getId() {
    return this.issue._id;
  }

  getName() {
    return this.issue._source.repo_name;
  }

  getDescription() {
    return this.issue._source.title;
  }

  getTag() {
    return "issues";
  }

  isFilter() {
    return false;
  }

  getFilterValue() {
    return undefined;
  }
}
