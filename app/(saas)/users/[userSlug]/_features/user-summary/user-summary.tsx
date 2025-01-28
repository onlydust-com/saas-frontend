import { Folder, GitFork, Github, Medal } from "lucide-react";
import { useMemo } from "react";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";

import { Avatar } from "@/design-system/atoms/avatar/variants/avatar-default";
import { Badge } from "@/design-system/atoms/badge";
import { PaperLoading } from "@/design-system/atoms/paper/paper.loading";
import { Paper } from "@/design-system/atoms/paper/variants/paper-default";
import { Tag } from "@/design-system/atoms/tag";
import { Typo } from "@/design-system/atoms/typo/variants/typo-default";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { Languages } from "@/shared/features/projects/languages/languages";
import { Metric } from "@/shared/features/projects/metric/metric";
import { SocialContact } from "@/shared/features/social/social-contact/social-contact";

import { UserSummaryProps } from "./user-summary.types";

export function UserSummary({ userSlug }: UserSummaryProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const { data, isLoading, isError } = BiReactQueryAdapter.client.useGetBiContributorById({
    pathParams: { contributorIdOrLogin: userSlug },
    options: {
      enabled: Boolean(userSlug),
    },
  });

  const { contributor, rewardCount, prCount, maintainedProjectCount, languages, ecosystems, rank } = data ?? {};

  const signedUpAt = useMemo(() => {
    if (contributor?.signedUpAt) {
      return dateKernelPort.format(new Date(contributor.signedUpAt), "MM/yyyy");
    }
    return null;
  }, [contributor]);

  const signedUpOnGithubAt = useMemo(() => {
    if (contributor?.signedUpOnGithubAt) {
      return dateKernelPort.format(new Date(contributor.signedUpOnGithubAt), "MM/yyyy");
    }
    return null;
  }, [contributor]);

  if (isLoading) {
    return <PaperLoading classNames={{ base: "h-[200px]" }} />;
  }

  if (isError || !data) {
    return null;
  }

  return (
    <Paper background="glass" border="primary" size="none">
      <div className="flex flex-col divide-y divide-border-primary">
        <div className="flex items-center justify-between gap-md p-xl">
          <div className="flex flex-row gap-lg">
            <Avatar src={contributor?.avatarUrl ?? ""} alt={contributor?.login ?? ""} size="xl" shape="squared" />
            <div className="flex h-full flex-col justify-between overflow-hidden">
              <Typo variant="heading" size="xs" weight="medium" color="primary" classNames={{ base: "truncate" }}>
                {contributor?.login}
              </Typo>

              <div className="flex items-center gap-md">
                <Metric icon={Medal} count={rewardCount?.value ?? 0} />
                <Metric icon={GitFork} count={prCount?.value ?? 0} />
                <Metric icon={Folder} count={maintainedProjectCount ?? 0} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-0 text-right">
            <Typo variant={"heading"} size={"xs"} weight={"medium"}>
              {rank?.getRank()}
            </Typo>
            <Typo as={"div"} size={"xs"} color={"tertiary"}>
              {rank?.getTitle().full}
            </Typo>
          </div>
        </div>

        <div className="flex flex-col gap-lg p-xl">
          <div className="flex flex-col gap-lg">
            {contributor?.bio ? (
              <div className="flex flex-col gap-sm">
                <Typo
                  size="xs"
                  weight="medium"
                  color="primary"
                  translate={{ token: "features:cardProjectOverview.description" }}
                />
                <Typo size="xs" color="primary" classNames={{ base: "line-clamp-3" }}>
                  {contributor?.bio}
                </Typo>
              </div>
            ) : null}
          </div>

          <div className="flex w-full items-center justify-between gap-md">
            <div className={"flex flex-row flex-wrap items-center justify-end gap-md"}>
              {!!signedUpAt && (
                <Badge shape={"squared"} avatar={{ src: "" }}>
                  {signedUpAt}
                </Badge>
              )}
              {!!signedUpOnGithubAt && (
                <Badge shape={"squared"} icon={{ component: Github }}>
                  {signedUpOnGithubAt}
                </Badge>
              )}
            </div>

            <div className={"flex flex-row items-center justify-between gap-1"}>
              {contributor?.contacts?.length ? (
                <div className={"flex flex-1 flex-row flex-wrap items-center gap-md"}>
                  {contributor?.contacts.map(contact => (
                    <SocialContact key={contact.contact} contact={contact} buttonProps={{ iconOnly: true }} />
                  ))}
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>

          {languages?.length ? (
            <div className="flex flex-col gap-lg">
              <Typo
                size="xs"
                weight="medium"
                color="primary"
                translate={{ token: "features:cardProjectOverview.languages" }}
              />
              <Languages languages={languages} />
            </div>
          ) : null}

          <ScrollView direction={"x"}>
            <div className={"flex flex-row gap-md"}>
              {ecosystems?.map(({ logoUrl, name, slug }) => (
                <Tag
                  key={name}
                  as={BaseLink}
                  htmlProps={{ href: NEXT_ROUTER.ecosystems.details.root(slug) }}
                  size={"sm"}
                  avatar={{ src: logoUrl, alt: name }}
                  classNames={{ base: "hover:opacity-80" }}
                >
                  {name}
                </Tag>
              ))}
            </div>
          </ScrollView>
        </div>
      </div>
    </Paper>
  );
}
