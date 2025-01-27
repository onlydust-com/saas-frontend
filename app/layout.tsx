import "@/public/fonts/clash/stylesheet.css";
import "@/public/fonts/inter/stylesheet.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

import "@/app/globals.css";
import { Providers } from "@/app/providers";

import { InitBootstrapAuth } from "@/core/bootstrap/auth/init-bootstrap-auth";
import { InitBootstrapImpersonation } from "@/core/bootstrap/impersonation/init-bootstrap-impersonation";

import { Toaster } from "@/design-system/molecules/toaster";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <InitBootstrapAuth />
          <InitBootstrapImpersonation />
          {children}
          <Toaster />
          <PosthogIdentifyUser />
          <PosthogPageview />
        </Providers>
      </body>
    </html>
  );
}
