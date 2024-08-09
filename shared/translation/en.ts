import { enTestTranslation } from "@/app/test/_translations/test.translate";

import { enPrimaryNavigationTranslation } from "@/shared/features/navigation/primary-navigation/_translations/primary-navigation.translate";
import common from "@/shared/translation/translations/common/common.en.json";

export const en = {
  common,
  ...enTestTranslation,
  ...enPrimaryNavigationTranslation,
};
