import "i18next";

import { en } from "@/shared/translation/en";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      en: typeof en;
    };
  }
}
