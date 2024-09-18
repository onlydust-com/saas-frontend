import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";

import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Tag } from "@/design-system/atoms/tag";
import { Typo } from "@/design-system/atoms/typo";

import { EcosystemsProps } from "./ecosystems.types";

export function Ecosystems({ githubId }: EcosystemsProps) {
  const { data, isLoading } = UserReactQueryAdapter.client.useGetUserEcosystems({
    pathParams: { githubId },
    options: {
      enabled: !!githubId,
    },
  });

  if (isLoading) {
    return <Skeleton className={"h-[170px] w-full"} />;
  }

  const ecosystems = data?.pages.flatMap(page => page.ecosystems);

  if (!ecosystems?.length) {
    return null;
  }

  return (
    <Paper size={"lg"} border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:contributor.ecosystems.title" }} />

      <div className={"flex flex-wrap gap-md"}>
        {ecosystems?.map(({ ecosystem: { logoUrl, name } }) => (
          <Tag
            key={name}
            size={"md"}
            classNames={{
              base: "max-w-full overflow-hidden",
              label: "whitespace-nowrap text-ellipsis overflow-hidden",
            }}
            avatar={{ src: logoUrl, alt: name }}
          >
            {name}
          </Tag>
        ))}
      </div>
    </Paper>
  );
}
