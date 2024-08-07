"use client";

import { PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";

import i18n from "@/shared/translation/init-i18n";

export function TranslationProvider({ children }: PropsWithChildren) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
