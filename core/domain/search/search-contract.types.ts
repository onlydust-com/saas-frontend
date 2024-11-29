import { IndiceInterface } from "@/core/domain/search/models/indice.types";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

export enum SearchIndice {
  Languages = "languages",
  Projects = "projects",
  Contributors = "contributors",
  Ecosystems = "ecosystems",
  Issues = "issues",
  Pr = "pr",
}

export interface BaseSearchResponse {
  _index: SearchIndice;
  _id: string;
  _score: number;
  _source: Record<string, string>;
}

export interface LanguageIndice extends BaseSearchResponse {
  _index: SearchIndice.Languages;
  _source: {
    name: string;
  };
}
export interface ProjectIndice extends BaseSearchResponse {
  _index: SearchIndice.Projects;
  _source: {
    name: string;
    short_description: string;
  };
}

export interface ContributorIndice extends BaseSearchResponse {
  _index: SearchIndice.Contributors;
  _source: {
    contributor_login: string;
  };
}

export interface EcosystemIndice extends BaseSearchResponse {
  _index: SearchIndice.Ecosystems;
  _source: {
    name: string;
  };
}

export interface IssueIndice extends BaseSearchResponse {
  _index: SearchIndice.Issues;
  _source: {
    title: string;
    author_login: string;
    repo_name: string;
  };
}

export interface PrIndice extends BaseSearchResponse {
  _index: SearchIndice.Pr;
  _source: {
    title: string;
    author_login: string;
    repo_name: string;
  };
}

export type SearchResponse = LanguageIndice | ProjectIndice;

export type SearchModel = {
  results: Array<IndiceInterface | undefined>;
  groups: Record<SearchIndice, Array<IndiceInterface | undefined>>;
  autoComplete: IndiceInterface | undefined;
};

export interface SearchRequestReponse {
  took: number;
  timed_out: boolean;
  _shards: {
    total: number;
    successful: number;
    skipped: number;
    failed: number;
  };
  hits: {
    total: {
      value: number;
      relation: string;
    };
    max_score: number;
    hits: SearchResponse[];
  };
}

type SearchQueryParams = {
  search?: string;
};

export type SearchPortResponse = HttpStorageResponse<SearchModel>;

export type SearchPortParams = HttpClientParameters<{
  QueryParams: SearchQueryParams;
}>;
