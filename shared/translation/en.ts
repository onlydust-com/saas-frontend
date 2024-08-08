import { enTestTranslation } from "@/app/test/_translations/test.translate";

import { enPrimaryMenuTranslation } from "@/shared/features/navigation/primary-menu/_translations/primary-menu.translate";
import common from "@/shared/translation/translations/common/common.en.json";

export const en = {
  common,
  ...enTestTranslation,
  ...enPrimaryMenuTranslation,
};
