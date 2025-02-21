import { useMemo } from "react";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { Card } from "@/shared/ui/card";
import { TypographyH3, TypographyMuted } from "@/shared/ui/typography";

import { LanguagesProps } from "./languages.types";

export function Languages({ githubLogin }: LanguagesProps) {
  const {
    data: stats,
    isLoading,
    isError,
  } = BiReactQueryAdapter.client.useGetBiContributorById({
    pathParams: { contributorIdOrLogin: githubLogin ?? "" },
    options: {
      enabled: Boolean(githubLogin),
    },
  });

  const renderLanguages = useMemo(() => {
    if (isLoading) {
      return <Skeleton className="h-[200px] w-full" background="glass" />;
    }

    if (isError) {
      return (
        <div className={"flex items-center justify-center py-10"}>
          <TypographyMuted>Error loading languages</TypographyMuted>
        </div>
      );
    }

    if (!stats?.languages?.length) {
      return (
        <div className={"flex items-center justify-center py-10"}>
          <TypographyMuted>No languages found</TypographyMuted>
        </div>
      );
    }

    return (
      <>
        {stats?.languages?.map(({ name, percentage, color }) => (
          <div key={name} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>{name}</span>
              <span className="text-muted-foreground">{percentage}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${percentage}%`, backgroundColor: color }}
              />
            </div>
          </div>
        ))}
      </>
    );
  }, [isLoading, isError, stats]);

  return (
    <Card className={"flex flex-col gap-4 p-4"}>
      <TypographyH3>Languages</TypographyH3>
      <div className="flex flex-col gap-xl">{renderLanguages}</div>
    </Card>
  );
}
