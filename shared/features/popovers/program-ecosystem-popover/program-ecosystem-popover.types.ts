import { ButtonPort } from "@/design-system/atoms/button/button.types";

import { ProgramEcosystemAutocompleteProps } from "@/shared/features/autocompletes/program-ecosystem-autocomplete/program-ecosystem-autocomplete.types";

export interface ProgramEcosystemPopoverProps extends ProgramEcosystemAutocompleteProps {
  buttonProps?: ButtonPort<"button">;
  searchParams?: string;
}
