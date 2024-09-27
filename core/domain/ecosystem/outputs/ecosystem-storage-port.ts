import {
  SearchEcosystemsPortParams,
  SearchEcosystemsPortResponse,
} from "@/core/domain/ecosystem/ecosystem-contract.types";

export interface EcosystemStoragePort {
  routes: Record<string, string>;
  searchEcosystems(p: SearchEcosystemsPortParams): SearchEcosystemsPortResponse;
}
