"use client";

import { Info } from "lucide-react";

import { Button } from "@/shared/ui/button";

export function SunsetBanner() {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-3">
            <Info className="h-5 w-5 flex-shrink-0" />
            <div className="text-sm font-medium">
              <div>
                We&apos;re transitioning to a new platform that opens opportunities beyond blockchain projects to
                include all open source projects.
              </div>
              <div>Please withdraw your pending rewards and join us on the new platform.</div>
            </div>
          </div>
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="flex items-center gap-2 whitespace-nowrap bg-white text-blue-600 hover:bg-gray-100"
          >
            <a href="https://contribute.onlydust.com" target="_blank" rel="noopener noreferrer">
              Explore New Platform
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
