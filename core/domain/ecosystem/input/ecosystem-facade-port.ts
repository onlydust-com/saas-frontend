import {
  SearchEcosystemsPortParams,
  SearchEcosystemsPortResponse,
} from "@/core/domain/ecosystem/ecosystem-contract.types";

export interface EcosystemFacadePort {
  searchEcosystems(p: SearchEcosystemsPortParams): SearchEcosystemsPortResponse;
}
