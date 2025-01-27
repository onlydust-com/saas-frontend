import { useMemo } from "react";

import { useGrantFromPanel } from "@/app/(saas)/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.hooks";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { bootstrap } from "@/core/bootstrap";
import { FirstParameter } from "@/core/kernel/types";

import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";
import { CardProject } from "@/design-system/molecules/cards/card-project";

import { ShowMore } from "@/shared/components/show-more/show-more";

export function AlreadyGrantedProjects({
  programId,
  queryParams,
}: {
  programId: string;
  queryParams: FirstParameter<typeof ProgramReactQueryAdapter.client.useGetProgramProjects>["queryParams"];
}) {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ProgramReactQueryAdapter.client.useGetProgramProjects({
      pathParams: {
        programId,
      },
      queryParams,
      options: {
        enabled: Boolean(programId),
      },
    });
  const alreadyGrantedProjects = useMemo(() => data?.pages.flatMap(page => page.projects) ?? [], [data]);

  const { open: openGrantForm } = useGrantFromPanel();

  function handleOpenProjectGrant(projectId: string) {
    openGrantForm({ programId, projectId });
  }

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
        <Typo translate={{ token: "common:state.error.title" }} color={"secondary"} size={"sm"} />
      </div>
    );
  }

  return (
    <>
      {alreadyGrantedProjects.map(project => {
        const { amount, code } = moneyKernelPort.format({
          amount: project.totalGranted.totalUsdEquivalent,
          currency: moneyKernelPort.getCurrency("USD"),
        });

        const description = project.truncateDescription(25);
        const grantedAmount = `${amount} ${code}`;

        return (
          <div key={project.id}>
            <CardProject
              title={project.name}
              description={description}
              logoUrl={project.logoUrl}
              languages={project.languages.map(language => ({ children: language.name }))}
              categories={project.categories.map(category => ({ children: category.name }))}
              buttonProps={{
                children: grantedAmount,
              }}
              onClick={() => handleOpenProjectGrant(project.id)}
              size={"none"}
              background={"transparent"}
              border={"none"}
            />
          </div>
        );
      })}

      {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
    </>
  );
}
