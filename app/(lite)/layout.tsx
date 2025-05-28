"use client";

import "keen-slider/keen-slider.min.css";
import { PropsWithChildren } from "react";
import "react-flagpack/dist/style.css";
import "remixicon/fonts/remixicon.css";

import { SaasProviders } from "@/app/(saas)/saas-providers";

import { AppHeader } from "@/shared/features/app/app-header/app-header";
import { AppSidebar } from "@/shared/features/app/app-sidebar/app-sidebar";
import { SunsetBanner } from "@/shared/features/app/sunset-banner/sunset-banner";
import { ImpersonationBanner } from "@/shared/features/impersonation/impersonation-banner";
import { SidebarInset } from "@/shared/ui/sidebar";

export default function LiteLayout({ children }: PropsWithChildren) {
  return (
    <SaasProviders>
      <SunsetBanner />
      <AppSidebar />
      <SidebarInset className="pt-16">
        <AppHeader />
        {children}
        <ImpersonationBanner />
      </SidebarInset>
    </SaasProviders>
  );
}
