"use client";

import onlydustLogoSpace from "@/public/images/logos/onlydust-logo-space.webp";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { CircleDot, Folder, GitPullRequest, HandCoins } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";
import { BiContributorInterface } from "@/core/domain/bi/models/bi-contributor-model";

import { Icon } from "@/design-system/atoms/icon";

import { ImageBanner } from "@/shared/features/image-banner/image-banner";
import { SocialContact } from "@/shared/features/social/social-contact/social-contact";
import { Github } from "@/shared/icons";
import { Avatar } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { TypographyH2, TypographyP, TypographySmall } from "@/shared/ui/typography";

import { PageHeaderProps } from "./page-header.types";

function Ecosystems({ ecosystems }: { ecosystems: string[] }) {
  if (ecosystems.length === 0) return null;

  return (
    <div className="flex gap-1 px-3 py-1 first:pl-0">
      {ecosystems.map(ecosystem => (
        <Badge variant="outline" key={ecosystem}>
          {ecosystem}
        </Badge>
      ))}
    </div>
  );
}

function Languages({ languages }: { languages: BiContributorInterface["languages"] }) {
  if (languages.length === 0) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-1 px-3 py-1 first:pl-0">
          {languages?.map(language => (
            <Avatar className="size-5" key={language.name}>
              <AvatarImage src={language.logoUrl} />
              <AvatarFallback className="rounded-xl">{language.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="end">
        <ul className="flex flex-col gap-2">
          {languages.map(language => (
            <li key={language.name} className="flex items-center justify-between gap-10">
              <div className="flex items-center gap-1">
                <Avatar className="size-5" key={language.name}>
                  <AvatarImage src={language.logoUrl} />
                  <AvatarFallback className="rounded-xl">{language.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <TypographySmall>{language.name}</TypographySmall>
              </div>

              <TypographySmall>{language.percentage}%</TypographySmall>
            </li>
          ))}
        </ul>
      </TooltipContent>
    </Tooltip>
  );
}

function Stats({ user }: { user: BiContributorInterface | undefined }) {
  if (!user) return null;

  function renderItem({ label, value, Icon }: { label: string; value: ReactNode; Icon: ReactNode }) {
    return (
      <div className="flex flex-row items-center justify-start gap-1">
        {Icon}
        <TypographySmall>{value}</TypographySmall>
        <TypographySmall className="text-muted-foreground">{label}</TypographySmall>
      </div>
    );
  }
  return (
    <div className="flex flex-row flex-wrap items-center justify-start gap-3">
      {renderItem({
        label: "Rewards",
        value: user.rewardCount.value,
        Icon: <Icon component={HandCoins} color="red" />,
      })}
      {renderItem({
        label: "Contributed projects",
        value: user?.projects?.length ?? 0,
        Icon: <Icon component={Folder} color="blue" />,
      })}
      {renderItem({
        label: "In progress issues",
        value: user?.inProgressIssueCount ?? 0,
        Icon: <Icon component={CircleDot} color="green" />,
      })}
      {renderItem({
        label: "Merged pull requests",
        value: user.prCount.value,
        Icon: <Icon component={GitPullRequest} color="purple" />,
      })}
    </div>
  );
}

function Contact({
  contacts,
}: {
  contacts:
    | {
        channel: "TELEGRAM" | "TWITTER" | "DISCORD" | "LINKEDIN" | "WHATSAPP";
        contact: string;
        visibility: "public" | "private";
      }[]
    | undefined;
}) {
  if (!contacts?.length) return null;

  return (
    <div className={"flex flex-row flex-wrap gap-2 px-3 py-1 first:pl-0"}>
      {contacts?.length
        ? contacts.map(contact => (
            <SocialContact key={contact.contact} contact={contact} buttonProps={{ iconOnly: true }} />
          ))
        : null}
    </div>
  );
}

export function PageHeader({ githubLogin }: PageHeaderProps) {
  const { data: user, isLoading } = UserReactQueryAdapter.client.useGetUserByLogin({
    pathParams: {
      slug: githubLogin,
    },
    options: {
      enabled: Boolean(githubLogin),
    },
  });

  const { data: stats } = BiReactQueryAdapter.client.useGetBiContributorById({
    pathParams: { contributorIdOrLogin: githubLogin },
    options: {
      enabled: Boolean(githubLogin),
    },
  });

  const { contributor, languages, ecosystems, rank } = stats ?? {};

  return (
    <div className="flex w-full flex-col border-b border-b-border bg-background pb-6 pt-6">
      <ImageBanner isLoading={isLoading} image={user?.avatarUrl} className="h-44 w-full rounded-xl" />
      <div className="relative z-[2] -mt-12 mb-6 ml-2 flex flex-row items-end justify-between tablet:-mt-16 tablet:ml-6">
        <Avatar className="h-24 w-24 rounded-xl border-4 border-background bg-background tablet:h-32 tablet:w-32">
          <AvatarImage src={user?.avatarUrl} alt={user?.login} className="h-full w-full object-cover" />
          <AvatarFallback>
            <img className="h-full w-full object-cover" src={onlydustLogoSpace?.src} alt={user?.login} />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex w-full flex-col gap-6 px-0">
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between gap-1">
            <TypographyH2>{user?.login}</TypographyH2>
            <div className="flex items-center justify-end gap-3">
              <div className="hidden tablet:block">
                <Button variant={"outline"} asChild>
                  <Link href={`https://github.com/${githubLogin}`} target="_blank">
                    <Github />
                    See on Github
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-0 text-left">
            <TypographyP className="text-muted-foreground">{rank?.getRankSummary()}</TypographyP>
          </div>
        </div>
        <div className="flex flex-row flex-wrap justify-between gap-4">
          <Stats user={stats} />
          <div className="flex flex-row flex-wrap divide-x">
            <Languages languages={languages ?? []} />
            <Ecosystems ecosystems={ecosystems?.map(ecosystem => ecosystem.name) ?? []} />
            <Contact contacts={contributor?.contacts} />
          </div>
        </div>
      </div>
    </div>
  );
}
