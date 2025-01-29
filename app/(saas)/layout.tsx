import "keen-slider/keen-slider.min.css";
import { ReactNode } from "react";
import "react-flagpack/dist/style.css";
import "remixicon/fonts/remixicon.css";

import { SaasProviders } from "@/app/(saas)/saas-providers";

import { AppWrapper } from "@/shared/features/app-wrapper/app-wrapper";

export default function SaasLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SaasProviders>
      <AppWrapper>{children}</AppWrapper>
    </SaasProviders>
  );
}
