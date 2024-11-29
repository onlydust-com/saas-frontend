import { IndiceInterface } from "@/core/domain/search/models/indice.types";
import { ProjectIndice } from "@/core/domain/search/search-contract.types";

export class ProjectsIndice implements IndiceInterface {
  constructor(private project: ProjectIndice) {}

  getId() {
    return this.project._id;
  }

  getName() {
    return this.project._source.name;
  }

  getDescription() {
    return this.project._source.short_description;
  }

  getTag() {
    return "project";
  }

  isFilter() {
    return false;
  }

  getFilterValue() {
    return undefined;
  }
}
