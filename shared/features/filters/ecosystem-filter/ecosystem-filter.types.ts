import { EcosystemsAutocompleteProps } from "@/shared/features/autocompletes/ecosystems-autocomplete/ecosystems-autocomplete.types";

export interface EcosystemFilterProps extends Pick<EcosystemsAutocompleteProps, "selectedEcosystems" | "onSelect"> {}
