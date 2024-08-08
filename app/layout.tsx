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

import { AnimatedColumnGroup } from "@/shared/components/animated-column-group/animated-column-group";
import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { PrimaryNavigation } from "@/shared/features/navigation/primary-navigation/primary-navigation";

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
          <div className={"mx-auto h-dvh w-dvw max-w-[2560px] overflow-hidden p-3"}>
            <AnimatedColumnGroup>
              <PrimaryNavigation />
              <AnimatedColumn autoWidth={true} className="size-full">
                {children}
              </AnimatedColumn>
            </AnimatedColumnGroup>
          </div>
        </Providers>
      </body>
    </html>
  );
}
