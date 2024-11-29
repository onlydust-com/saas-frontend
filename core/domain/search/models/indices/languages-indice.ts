import { IndiceInterface } from "@/core/domain/search/models/indice.types";
import { LanguageIndice } from "@/core/domain/search/search-contract.types";

export class LanguagesIndice implements IndiceInterface {
  constructor(private language: LanguageIndice) {}

  getId() {
    return this.language._id;
  }

  getName() {
    return this.language._source.name;
  }

  getDescription() {
    return undefined;
  }

  getTag() {
    return "language";
  }

  isFilter() {
    return true;
  }

  getFilterValue() {
    return this.language._source.name;
  }
}
