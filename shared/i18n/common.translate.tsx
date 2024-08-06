"use client";

import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

export function CommonTranslate({ children }: PropsWithChildren) {
  const { i18n } = useTranslation();

  i18n.addResourceBundle("en", "common", {
    submit: "Submit",
  });

  return children;
}
