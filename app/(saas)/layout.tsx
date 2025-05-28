"use client";

import "keen-slider/keen-slider.min.css";
import { PropsWithChildren } from "react";
import "react-flagpack/dist/style.css";
import "remixicon/fonts/remixicon.css";

import { SaasProviders } from "@/app/(saas)/saas-providers";

import { AppMigrationBanner } from "@/shared/features/app-migration-banner/app-migration-banner";
import { AppHeader } from "@/shared/features/app/app-header/app-header";
import { SidebarInset } from "@/shared/ui/sidebar";

export default function SaasLayout({ children }: PropsWithChildren) {
  return (
    <SaasProviders>
      <SidebarInset>
        <AppHeader />
        <AppMigrationBanner />
        {children}
      </SidebarInset>
    </SaasProviders>
  );
}
