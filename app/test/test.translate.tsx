"use client";

import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

export function TestTranslate({ children }: PropsWithChildren) {
  const { i18n } = useTranslation();

  i18n.addResourceBundle("en", "test", {
    very: {
      deep: {
        trad: "COOL",
      },
    },
  });

  return children;
}
