"use client";

import { Trans } from "react-i18next";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export function Translate(props: TranslateProps) {
  return <Trans {...props} />;
}
