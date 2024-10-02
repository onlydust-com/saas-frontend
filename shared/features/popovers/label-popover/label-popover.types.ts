import { ButtonPort } from "@/design-system/atoms/button/button.types";

import { LabelAutocompleteProps } from "@/shared/features/autocompletes/label-autocomplete/label-autocomplete.types";

export interface LabelPopoverProps extends LabelAutocompleteProps {
  buttonProps?: ButtonPort<"button">;
}
