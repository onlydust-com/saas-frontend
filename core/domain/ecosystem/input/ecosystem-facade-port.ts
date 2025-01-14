import {
  GetEcosystemBySlugPortParams,
  GetEcosystemBySlugPortResponse,
  GetEcosystemContributorsPortParams,
  GetEcosystemContributorsPortResponse,
  GetEcosystemProjectsPortParams,
  GetEcosystemProjectsPortResponse,
  GetEcosystemsPortParams,
  GetEcosystemsPortResponse,
  SearchEcosystemsPortParams,
  SearchEcosystemsPortResponse,
} from "@/core/domain/ecosystem/ecosystem-contract.types";

export interface EcosystemFacadePort {
  searchEcosystems(p: SearchEcosystemsPortParams): SearchEcosystemsPortResponse;
  getEcosystems(p: GetEcosystemsPortParams): GetEcosystemsPortResponse;
  getEcosystemBySlug(p: GetEcosystemBySlugPortParams): GetEcosystemBySlugPortResponse;
  getEcosystemContributors(p: GetEcosystemContributorsPortParams): GetEcosystemContributorsPortResponse;
}
