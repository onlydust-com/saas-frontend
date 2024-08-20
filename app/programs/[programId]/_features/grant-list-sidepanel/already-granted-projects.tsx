import { useMemo } from "react";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { bootstrap } from "@/core/bootstrap";

import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";
import { CardProject } from "@/design-system/molecules/cards/card-project";

import { ShowMore } from "@/shared/components/show-more/show-more";

export function AlreadyGrantedProjects({ programId }: { programId: string }) {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ProgramReactQueryAdapter.client.useGetProgramProjects({
      pathParams: {
        programId,
      },
      options: {
        enabled: Boolean(programId),
      },
    });
  const alreadyGrantedProjects = useMemo(() => data?.pages.flatMap(page => page.projects) ?? [], [data]);

  if (isLoading) {
    return (
      <div className={"grid gap-2"}>
        <Skeleton classNames={{ base: "h-24" }} />
        <Skeleton classNames={{ base: "h-24" }} />
        <Skeleton classNames={{ base: "h-24" }} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={"py-16 text-center"}>
        <Typo translate={{ token: "common:state.error.title" }} color={"text-2"} size={"s"} />
      </div>
    );
  }

  return (
    <div className={"grid gap-2"}>
      {alreadyGrantedProjects.map(project => {
        const description = project.shortDescription ?? "";
        const formattedDescription = description.length > 25 ? `${description.slice(0, 25)}...` : description;

        const { amount, code } = moneyKernelPort.format({
          amount: project.totalGranted.totalUsdEquivalent,
          currency: moneyKernelPort.getCurrency("USD"),
        });

        return (
          <CardProject
            key={project.id}
            title={project.name}
            description={formattedDescription}
            logoUrl={project.logoUrl}
            languages={project.languages.map(language => ({ children: language.name }))}
            categories={project.categories.map(category => ({ children: category.name }))}
            buttonProps={{
              children: `${amount} ${code}`,
              classNames: {
                base: "pointer-events-none whitespace-nowrap",
              },
            }}
          />
        );
      })}

      {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
    </div>
  );
}
