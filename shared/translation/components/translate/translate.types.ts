import { ComponentProps } from "react";
import { Trans } from "react-i18next";

export interface TranslateProps extends ComponentProps<typeof Trans> {
  token: ComponentProps<typeof Trans>["i18nKey"];
}
