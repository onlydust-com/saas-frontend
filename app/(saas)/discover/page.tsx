"use client";

import DiscoverPageV1 from "./v1";
import DiscoverPageV2 from "./v2";

export default function DiscoverPage() {
  if (process.env.NEXT_PUBLIC_DISCOVER_V2_ENABLED === "true") {
    return <DiscoverPageV2 />;
  }

  return <DiscoverPageV1 />;
}
