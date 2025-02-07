import "@/public/fonts/clash/stylesheet.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import { ReactNode } from "react";

import "@/app/globals.css";
import { Providers } from "@/app/providers";

import { InitBootstrapAuth } from "@/core/bootstrap/auth/init-bootstrap-auth";
import { InitBootstrapImpersonation } from "@/core/bootstrap/impersonation/init-bootstrap-impersonation";

import { Toaster } from "@/shared/ui/sonner";
import { cn } from "@/shared/utils";

import { sharedMetadata } from "./shared-metadata";

const PosthogIdentifyUser = dynamic(
  () => import("@/shared/tracking/posthog/posthog-identify-user").then(mod => mod.PosthogIdentifyUser),
  {
    ssr: false,
  }
);

const PosthogPageview = dynamic(
  () => import("@/shared/tracking/posthog/posthog-pageview").then(mod => mod.PosthogPageview),
  {
    ssr: false,
  }
);

export const metadata: Metadata = sharedMetadata;

const geist = localFont({
  src: "./_assets/fonts/geist/Geist-VariableFont_wght.ttf",
  variable: "--font-geist",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={cn(geist.variable, "dark")}>
      <body className="bg-background text-foreground">
        <Providers>
          <InitBootstrapAuth />
          <InitBootstrapImpersonation />
          {children}
          <Toaster position="bottom-left" richColors />
          <PosthogIdentifyUser />
          <PosthogPageview />
        </Providers>
      </body>
    </html>
  );
}
