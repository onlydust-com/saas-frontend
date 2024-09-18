import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";

import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Tag } from "@/design-system/atoms/tag";
import { Typo } from "@/design-system/atoms/typo";

import { LanguagesProps } from "./languages.types";

export function Languages({ githubId }: LanguagesProps) {
  const { data, isLoading } = UserReactQueryAdapter.client.useGetUserLanguages({
    pathParams: { githubId },
    options: {
      enabled: !!githubId,
    },
  });

  if (isLoading) {
    return <Skeleton className={"h-[170px] w-full"} />;
  }

  const languages = data?.pages.flatMap(page => page.languages);

  if (!languages?.length) {
    return null;
  }

  return (
    <Paper size={"lg"} border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:projectDetail.languages.title" }} />

      <div className={"flex flex-wrap gap-md"}>
        {languages?.map(({ language: { logoUrl, name } }) => (
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
