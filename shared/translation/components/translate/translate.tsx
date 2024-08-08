"use client";

import { ComponentProps } from "react";
import { Trans } from "react-i18next";

export function Translate(props: ComponentProps<typeof Trans>) {
  return <Trans {...props} />;
}

export type TranlateProps = ComponentProps<typeof Translate>;
