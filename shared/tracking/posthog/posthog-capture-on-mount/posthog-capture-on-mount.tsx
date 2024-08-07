"use client";

import { useEffect } from "react";

import { usePosthog } from "../use-posthog";
import { PosthogCaptureOnMountProps } from "./posthog-capture-on-mount.types";

export function PosthogCaptureOnMount({ eventName, params, paramsReady }: PosthogCaptureOnMountProps) {
  const { capture } = usePosthog();

  useEffect(() => {
    if (!params) {
      capture(eventName);
    } else if (paramsReady) {
      capture(eventName, params);
    }
  }, [capture, params, paramsReady]);

  return null;
}
