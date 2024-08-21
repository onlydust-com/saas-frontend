import { useMemo } from "react";

import { useGrantFormContext } from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.context";

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

  const {
    sidePanel: { open: openGrantForm },
    projectIdState: [, setGrantProjectId],
  } = useGrantFormContext();

  function handleOpenProjectGrant(projectId: string) {
    setGrantProjectId(projectId);
    openGrantForm();
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
        <Typo translate={{ token: "common:state.error.title" }} color={"text-2"} size={"s"} />
      </div>
    );
  }

  return (
    <div className={"grid gap-2"}>
      {alreadyGrantedProjects.map(project => {
        const { amount, code } = moneyKernelPort.format({
          amount: project.totalGranted.totalUsdEquivalent,
          currency: moneyKernelPort.getCurrency("USD"),
        });

        const description = project.truncateDescription(25);
        const grantedAmount = `${amount} ${code}`;

        return (
          <CardProject
            key={project.id}
            title={project.name}
            description={description}
            logoUrl={project.logoUrl}
            languages={project.languages.map(language => ({ children: language.name }))}
            categories={project.categories.map(category => ({ children: category.name }))}
            buttonProps={{
              children: grantedAmount,
              classNames: {
                base: "pointer-events-none whitespace-nowrap",
              },
            }}
            onClick={() => handleOpenProjectGrant(project.id)}
          />
        );
      })}

      {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
    </div>
  );
}
