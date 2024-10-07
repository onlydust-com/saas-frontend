import { SelectInputProps } from "@/design-system/molecules/select";

export interface RewardedAutocompleteProps extends SelectInputProps {
  selectedRewardedType?: string[];
  onSelect?: (userType: string[]) => void;
}
