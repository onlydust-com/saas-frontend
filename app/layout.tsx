import "@/public/fonts/Alfreda/stylesheet.css";
import "@/public/fonts/Belwe/stylesheet.css";
import "@/public/fonts/GTWalsheimPro/stylesheet.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
import "remixicon/fonts/remixicon.css";

import "@/app/globals.css";
import { Providers } from "@/app/providers";

import { InitBootstrapAuth } from "@/core/bootstrap/init-bootstrap-auth";
import { InitBootstrapImpersonation } from "@/core/bootstrap/init-bootstrap-impersonation";

import { Toaster } from "@/design-system/atoms/toaster";

import { AnimatedColumns } from "@/shared/components/animated-columns/animated-columns";

import { sharedMetadata } from "./shared-metadata";

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
    <html lang="en">
      <body>
        <Providers>
          <InitBootstrapAuth />
          <InitBootstrapImpersonation />
          <PosthogPageview />
          <Toaster />
          <AnimatedColumns>
            <div className="h-screen w-[200px] bg-red-900">NAV</div>
            <div className="h-screen w-full bg-blue-900">{children}</div>
          </AnimatedColumns>
        </Providers>
      </body>
    </html>
  );
}
