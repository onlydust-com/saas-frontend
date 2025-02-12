"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

// import { Tabs } from "@/design-system/molecules/tabs/tabs";
import { BaseLink } from "@/shared/components/base-link/base-link";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { useAuthContext } from "@/shared/providers/auth-provider";
import { Translate } from "@/shared/translation/components/translate/translate";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";

enum Views {
  "OVERVIEW" = "OVERVIEW",
  "OPEN_ISSUES" = "OPEN_ISSUES",
  "CONTRIBUTORS" = "CONTRIBUTORS",
  "REWARDS" = "REWARDS",
}

const PROJECT_ROUTES = (projectSlug: string) => [
  { href: NEXT_ROUTER.projects.details.overview.root(projectSlug), label: "Overview" },
  { href: NEXT_ROUTER.projects.details.issues.root(projectSlug), label: "Open Issues" },
  { href: NEXT_ROUTER.projects.details.contributors.root(projectSlug), label: "Contributors" },
  { href: NEXT_ROUTER.projects.details.rewards.root(projectSlug), label: "Rewards" },
];

export function ProjectNavigation({ params }: { params: { projectSlug: string } }) {
  const currentPath = usePathname();

  return (
    <Tabs
      defaultValue={NEXT_ROUTER.projects.details.overview.root(params.projectSlug)}
      value={currentPath}
      className="flex w-full flex-col gap-4 pt-4"
    >
      <TabsList className="h-auto w-full flex-wrap justify-start">
        {PROJECT_ROUTES(params.projectSlug).map(({ href, label }) => (
          <TabsTrigger key={href} value={href} className="flex-1">
            <Link href={href}>{label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
