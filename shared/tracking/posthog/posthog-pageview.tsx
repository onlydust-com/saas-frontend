"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { usePosthog } from "@/shared/tracking/posthog/use-posthog";

export function PosthogPageview(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { posthog, capture } = usePosthog();

  useEffect(() => {
    // Track pageviews
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}
