import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";

import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Tag } from "@/design-system/atoms/tag";
import { Typo } from "@/design-system/atoms/typo";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";

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
    <Paper size={"lg"} border={"primary"} classNames={{ base: "flex flex-col gap-lg overflow-hidden" }}>
      <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:contributor.languages.title" }} />

      <ScrollView direction={"y"}>
        <div className={"flex flex-row gap-md"}>
          {languages?.map(({ language: { logoUrl, name } }) => (
            <Tag key={name} size={"md"} avatar={{ src: logoUrl, alt: name }}>
              {name}
            </Tag>
          ))}
        </div>
      </ScrollView>
    </Paper>
  );
}
