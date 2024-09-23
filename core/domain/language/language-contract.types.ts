import { LanguageInterface } from "@/core/domain/language/models/language-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* --------------------------------- Get Language -------------------------------- */
export type GetLanguagesResponse = components["schemas"]["LanguagesResponse"];

export type GetLanguagesPortResponse = HttpStorageResponse<
  Omit<GetLanguagesResponse, "languages"> & { languages: LanguageInterface[] }
>;

export type GetLanguagesPortParams = HttpClientParameters<object>;
