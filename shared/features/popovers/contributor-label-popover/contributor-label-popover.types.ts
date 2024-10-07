import { ProjectContributorLabelsResponse } from "@/core/domain/project/models/project-contributor-labels-model";

import { ButtonPort } from "@/design-system/atoms/button/button.types";

import { ContributorLabelAutocompleteProps } from "@/shared/features/autocompletes/contributor-label-autocomplete/contributor-label-autocomplete.types";

export interface ContributorLabelPopoverProps extends Omit<ContributorLabelAutocompleteProps, "selectedLabels"> {
  buttonProps?: ButtonPort<"button">;
  projectIdOrSlug: string;
  selectedLabels?: ProjectContributorLabelsResponse[];
}
