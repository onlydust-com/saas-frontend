import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { UserTypeAutocompleteProps } from "@/shared/features/autocompletes/user-type-autocomplete/user-type-autocomplete.types";

export function UserTypeAutocomplete({ selectedUserType, onSelect, ...selectProps }: UserTypeAutocompleteProps) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");

  const filteredUserType = useMemo(() => {
    return user?.programs?.filter(program => program.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, user?.programs]);
}
