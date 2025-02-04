import { FetchAdapter } from "@/legacy/api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "@/legacy/api-client/adapter/fetch/fetch-adapter.types";
import { ParametersInterface } from "@/legacy/api-client/types/parameters-interface";

import adapters from "../adapters";
import tags from "../tags";
import { GetProjectCategories } from "../types";

export function getAllProjectsCategories(_: ParametersInterface<object>): IFetchAdapater<GetProjectCategories> {
  return new FetchAdapter<GetProjectCategories>(adapters.get_all_categories).setTag(tags.get_all_categories());
}
