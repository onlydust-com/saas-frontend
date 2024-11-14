import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type VatRegulationState =
  components["schemas"]["InvoicePreviewResponseCompanyBillingProfile"]["vatRegulationState"];

export enum BillingProfileType {
  Company = "COMPANY",
  Individual = "INDIVIDUAL",
  SelfEmployed = "SELF_EMPLOYED",
}

export type BillingProfileTypeUnion = components["schemas"]["BillingProfileResponse"]["type"];

export enum BillingProfileRole {
  Admin = "ADMIN",
  Member = "MEMBER",
}

export type BillingProfileRoleUnion = components["schemas"]["ShortBillingProfileResponse"]["role"];
