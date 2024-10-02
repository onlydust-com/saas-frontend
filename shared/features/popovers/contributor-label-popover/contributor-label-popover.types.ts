import { ButtonPort } from "@/design-system/atoms/button/button.types";

import { ContributorLabelAutocompleteProps } from "@/shared/features/autocompletes/contributor-label-autocomplete/contributor-label-autocomplete.types";

export interface ContributorLabelPopoverProps extends ContributorLabelAutocompleteProps {
  buttonProps?: ButtonPort<"button">;
}
