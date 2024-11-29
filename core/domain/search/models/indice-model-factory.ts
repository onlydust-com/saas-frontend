import { IndiceInterface } from "@/core/domain/search/models/indice.types";
import { ContributorsIndice } from "@/core/domain/search/models/indices/contributors-indice";
import { EcosystemsIndice } from "@/core/domain/search/models/indices/ecosystems-indice";
import { IssuesIndice } from "@/core/domain/search/models/indices/issues-indice";
import { LanguagesIndice } from "@/core/domain/search/models/indices/languages-indice";
import { PullRequestIndice } from "@/core/domain/search/models/indices/pr-indice";
import { ProjectsIndice } from "@/core/domain/search/models/indices/projects-indice";
import {
  BaseSearchResponse,
  ContributorIndice,
  EcosystemIndice,
  IssueIndice,
  LanguageIndice,
  PrIndice,
  ProjectIndice,
  SearchIndice,
} from "@/core/domain/search/search-contract.types";

export function isLanguage(indice: BaseSearchResponse): indice is LanguageIndice {
  return (indice as LanguageIndice)._index === SearchIndice.Languages;
}

export function isProject(indice: BaseSearchResponse): indice is ProjectIndice {
  return (indice as ProjectIndice)._index === SearchIndice.Projects;
}

export function isContributors(indice: BaseSearchResponse): indice is ContributorIndice {
  return (indice as ContributorIndice)._index === SearchIndice.Contributors;
}

export function isIssues(indice: BaseSearchResponse): indice is IssueIndice {
  return (indice as IssueIndice)._index === SearchIndice.Issues;
}

export function isPr(indice: BaseSearchResponse): indice is PrIndice {
  return (indice as PrIndice)._index === SearchIndice.Pr;
}

export function isEcosystem(indice: BaseSearchResponse): indice is EcosystemIndice {
  return (indice as EcosystemIndice)._index === SearchIndice.Ecosystems;
}

export class IndiceFactory {
  static createIndice(searchResponse: BaseSearchResponse): IndiceInterface | undefined {
    if (isLanguage(searchResponse)) {
      return new LanguagesIndice(searchResponse);
    }

    if (isProject(searchResponse)) {
      return new ProjectsIndice(searchResponse);
    }

    if (isContributors(searchResponse)) {
      return new ContributorsIndice(searchResponse);
    }

    if (isIssues(searchResponse)) {
      return new IssuesIndice(searchResponse);
    }

    if (isPr(searchResponse)) {
      return new PullRequestIndice(searchResponse);
    }

    if (isEcosystem(searchResponse)) {
      return new EcosystemsIndice(searchResponse);
    }

    return undefined;
  }
}
