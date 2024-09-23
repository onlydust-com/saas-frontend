import { GetLanguagesPortParams, GetLanguagesPortResponse } from "../language-contract.types";

export interface LanguageStoragePort {
  routes: Record<string, string>;
  getLanguages(p: GetLanguagesPortParams): GetLanguagesPortResponse;
}
