"use client";

import "keen-slider/keen-slider.min.css";
import { ReactNode } from "react";
import "react-flagpack/dist/style.css";
import "remixicon/fonts/remixicon.css";

import { SaasProviders } from "@/app/(saas)/saas-providers";

import { AppHeader } from "@/shared/features/app/app-header/app-header";
import { AppSidebar } from "@/shared/features/app/app-sidebar/app-sidebar";
import { ImpersonationBanner } from "@/shared/features/impersonation/impersonation-banner";
import { SidebarInset } from "@/shared/ui/sidebar";

export default function SaasLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    // return <div className={"flex h-dvh w-dvw flex-col overflow-hidden"}>{renderApp()}</div>;

    <SaasProviders>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="mx-auto max-w-fit bg-red-500">{children}</div>
        <ImpersonationBanner />
      </SidebarInset>
    </SaasProviders>
  );
}
