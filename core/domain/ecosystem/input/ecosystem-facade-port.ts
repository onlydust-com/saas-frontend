import {
  GetEcosystemBySlugPortParams,
  GetEcosystemBySlugPortResponse,
  GetEcosystemContributorsPortParams,
  GetEcosystemContributorsPortResponse,
  GetEcosystemEventsPortParams,
  GetEcosystemEventsPortResponse,
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
  getEcosystemEvents(p: GetEcosystemEventsPortParams): GetEcosystemEventsPortResponse;
}
