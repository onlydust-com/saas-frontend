"use client";

import { Trans } from "react-i18next";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export function Translate({ token, ...props }: TranslateProps) {
  return <Trans {...props} i18nKey={token} />;
}
