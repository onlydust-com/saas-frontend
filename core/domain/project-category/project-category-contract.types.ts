/* --------------------------------- Get project categories -------------------------------- */
import { ProjectCategory } from "@/core/domain/project-category/models/project-category-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

export type GetProjectCategoriesResponse = components["schemas"]["ProjectCategoriesResponse"];

export type GetProjectCategoriesPortResponse = HttpStorageResponse<
  Omit<GetProjectCategoriesResponse, "categories"> & { categories: ProjectCategory[] }
>;

export type GetProjectCategoriesPortParams = HttpClientParameters<object>;
