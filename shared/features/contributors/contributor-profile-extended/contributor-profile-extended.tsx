import { useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { SocialContact } from "@/shared/features/social/social-contact/social-contact";
import { Github } from "@/shared/icons";

import { ContributorProfileExtendedProps } from "./contributor-profile-extended.types";

export function ContributorProfileExtended({ user, headerProps, footerContent }: ContributorProfileExtendedProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const { contributor } = user;

  const signedUpAt = useMemo(() => {
    if (contributor.signedUpAt) {
      return dateKernelPort.format(new Date(contributor.signedUpAt), "MM/yyyy");
    }
    return null;
  }, [contributor]);

  const signedUpOnGithubAt = useMemo(() => {
    if (contributor.signedUpOnGithubAt) {
      return dateKernelPort.format(new Date(contributor.signedUpOnGithubAt), "MM/yyyy");
    }
    return null;
  }, [contributor]);

  const renderHeader = useMemo(() => {
    if (headerProps) {
      return (
        <div className="flex justify-between gap-2">
          {headerProps.headerLabel ? <Typo {...headerProps.headerLabel} size={"sm"} weight={"medium"} /> : null}
          {headerProps.badgeProps ? <Badge {...headerProps.badgeProps} size={"xxs"} /> : null}
        </div>
      );
    }
    return null;
  }, [headerProps]);

  return (
    <Paper border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      {renderHeader}
      <div className={"flex flex-row items-center justify-start gap-lg"}>
        <Avatar size={"2xl"} shape={"squared"} src={contributor.avatarUrl} />
        <div className={"flex w-full flex-col gap-sm"}>
          <div className={"flex flex-row items-center justify-between gap-1"}>
            <Typo variant={"heading"} size={"xs"} weight={"medium"}>
              {contributor.login}
            </Typo>
            <Typo variant={"heading"} size={"xs"} weight={"medium"}>
              {user.rank.getRank()}
            </Typo>
          </div>
          <Typo as={"div"} size={"sm"} color={"tertiary"}>
            {user.rank.getRankSummary()}
          </Typo>
        </div>
      </div>
      {contributor.bio && (
        <Typo size={"xs"} color={"secondary"}>
          {contributor.bio}
        </Typo>
      )}

      <Typo
        size={"xs"}
        color={"primary"}
        weight={"medium"}
        translate={{ token: "features:contributorProfileExtended.followers", count: contributor.followerCount }}
      />

      <div className={"flex w-full flex-row items-center justify-between gap-1"}>
        {contributor.contacts?.length ? (
          <div className={"flex flex-1 flex-row flex-wrap items-center gap-md"}>
            {contributor.contacts.map(contact => (
              <SocialContact key={contact.contact} contact={contact} buttonProps={{ iconOnly: true }} />
            ))}
          </div>
        ) : null}

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
      </div>
      {footerContent}
    </Paper>
  );
}
