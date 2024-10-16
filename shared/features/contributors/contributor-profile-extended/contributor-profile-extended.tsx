import { useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { SocialIconLink } from "@/shared/features/social-link/social-icon-link/social-icon-link";
import { Github } from "@/shared/icons";

import { ContributorProfileExtendedProps } from "./contributor-profile-extended.types";

export function ContributorProfileExtended({ user, headerProps, footerContent }: ContributorProfileExtendedProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const signedUpAt = useMemo(() => {
    if (user.signedUpAt) {
      return dateKernelPort.format(new Date(user.signedUpAt), "MM/yyyy");
    }
    return null;
  }, [user]);

  const signedUpOnGithubAt = useMemo(() => {
    if (user.signedUpOnGithubAt) {
      return dateKernelPort.format(new Date(user.signedUpOnGithubAt), "MM/yyyy");
    }
    return null;
  }, [user]);

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
        <Avatar size={"2xl"} shape={"squared"} src={user.avatarUrl} />
        <div className={"flex w-full flex-col gap-sm"}>
          <div className={"flex flex-row items-center justify-between gap-1"}>
            <Typo variant={"heading"} size={"xs"} weight={"medium"}>
              {user.login}
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
      {user.bio && (
        <Typo size={"xs"} color={"secondary"}>
          {user.bio}
        </Typo>
      )}

      {/*// TODO KEEP THIS WHEN BACKEND IS READY*/}
      {/*<Typo*/}
      {/*  size={"xs"}*/}
      {/*  color={"primary"}*/}
      {/*  weight={"medium"}*/}
      {/*  translate={{ token: "features:contributorProfileExtended.followers", count: 12 }}*/}
      {/*/>*/}

      {user.contacts?.length ? (
        <div className={"flex w-full flex-row items-center justify-between gap-1"}>
          <div className={"flex flex-1 flex-row flex-wrap items-center gap-md"}>
            {user.contacts.map(contact => (
              <Button
                key={contact.contact}
                iconOnly={true}
                as={"a"}
                size={"sm"}
                variant={"secondary"}
                htmlProps={{
                  href: contact.contact,
                  target: "_blank",
                  rel: "noreferrer",
                }}
                startContent={<SocialIconLink url={contact.contact} />}
              />
            ))}
          </div>

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
      ) : null}
      {footerContent}
    </Paper>
  );
}
