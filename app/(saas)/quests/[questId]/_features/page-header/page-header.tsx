"use client";

import onlydustLogoSpace from "@/public/images/logos/onlydust-logo-space.webp";
import { FilloutStandardEmbed } from "@fillout/react";
import { CircleDotDashed, GitMerge, Star, User } from "lucide-react";
import Link from "next/link";
import { ReactNode, useMemo, useState } from "react";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { ProjectInterfaceV2 } from "@/core/domain/project/models/project-model-v2";
import { UserProfileContactChannel } from "@/core/domain/user/models/user.types";

import { Icon } from "@/design-system/atoms/icon";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { useContributorSidePanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel.hooks";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { TypographyH2, TypographyMuted, TypographyP, TypographySmall } from "@/shared/ui/typography";

import { QuestListData } from "../../../_data/quest-list.data";
import { ImageBanner } from "../../_components/image-banner/image-banner";
import { PageHeaderProps } from "./page-header.types";

function ActionHeader({ projectSlug }: { projectSlug: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthUser();
  const { data: userProfile } = MeReactQueryAdapter.client.useGetMyProfile({});

  const prefillParams = {
    full_name: `${user?.firstName} ${user?.lastName}`,
    email: user?.email,
    github_login: user?.login,
    linkedin_profile: userProfile?.getContact(UserProfileContactChannel.linkedin)?.contact,
    telegram_handle: userProfile?.getContactTelegram()?.contact,
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center gap-2">
        <Button variant="outline" asChild>
          <Link href={NEXT_ROUTER.projects.details.root(projectSlug)}>See project</Link>
        </Button>

        <SheetTrigger asChild>
          <Button>Apply now</Button>
        </SheetTrigger>
      </div>
      <SheetContent className="flex flex-col gap-8">
        <SheetHeader>
          <SheetTitle>Apply to this quest</SheetTitle>
        </SheetHeader>
        <FilloutStandardEmbed filloutId="7nGf4YdHqzus" inheritParameters parameters={prefillParams} />
      </SheetContent>
    </Sheet>
  );
}

function Categories({ categories }: { categories: string[] }) {
  if (categories.length === 0) return null;

  return (
    <div className="flex gap-1 px-3 py-1 first:pl-0">
      {categories.map(category => (
        <Badge variant="outline" key={category}>
          {category}
        </Badge>
      ))}
    </div>
  );
}

function Languages({ languages }: { languages: ProjectInterfaceV2["languages"] }) {
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

function Leads({ leads }: { leads: ProjectInterfaceV2["leads"] }) {
  const { open } = useContributorSidePanel();
  if (leads.length === 0) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2 px-3 py-1 first:pl-0">
          <TypographyMuted>Maintained by</TypographyMuted>
          <AvatarGroup
            avatars={
              leads.map(lead => ({
                src: lead.avatarUrl,
                alt: lead.login,
              })) ?? []
            }
            classNames={{
              avatar: "size-5 first:ml-0 -ml-2",
            }}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="end">
        <ul className="flex flex-col gap-2">
          {leads.map(leads => (
            <li
              key={leads.login}
              className="flex cursor-pointer items-center justify-between gap-10"
              onClick={() => open({ githubId: leads.githubUserId })}
            >
              <div className="flex items-center gap-1">
                <Avatar className="size-5" key={leads.login}>
                  <AvatarImage src={leads.avatarUrl} />
                  <AvatarFallback className="rounded-xl">{leads.login.charAt(0)}</AvatarFallback>
                </Avatar>
                <TypographySmall>{leads.login}</TypographySmall>
              </div>
            </li>
          ))}
        </ul>
      </TooltipContent>
    </Tooltip>
  );
}

function Stats({ project }: { project: ProjectInterfaceV2 | undefined }) {
  if (!project) return null;

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
        label: "Active contributors",
        value: project.contributorCount,
        Icon: <Icon component={User} color="red" />,
      })}
      {renderItem({
        label: "Availables issues",
        value: project.availableIssueCount,
        Icon: <Icon component={CircleDotDashed} color="green" />,
      })}
      {renderItem({
        label: "PRs Merged",
        value: project.mergedPrCount,
        Icon: <Icon component={GitMerge} color="purple" />,
      })}
      {renderItem({
        label: "Stars",
        value: project.starCount,
        Icon: <Icon component={Star} color="yellow" />,
      })}
    </div>
  );
}

export default function QuestPage({ questId }: PageHeaderProps) {
  const quest = QuestListData.find(quest => quest.id === questId);
  const { data: project, isLoading } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: quest?.projectSlug ?? "",
    },
    options: {
      enabled: Boolean(quest?.projectSlug),
    },
  });

  const renderBanner = useMemo(() => {
    if (quest?.bannerUrl) {
      return (
        <div className="relative z-[1] h-[454px] w-full overflow-hidden rounded-xl">
          <img
            src={quest?.bannerUrl}
            className="absolute inset-0 -z-[1] h-full w-full object-cover object-bottom"
            loading="lazy"
            alt="Quest image"
          />
        </div>
      );
    }

    return <ImageBanner isLoading={isLoading} image={project?.logoUrl} className="h-[454px] w-full rounded-xl" />;
  }, [quest?.bannerUrl, project?.logoUrl, isLoading]);

  return (
    <div className="flex w-full flex-col bg-background">
      {renderBanner}
      <Avatar className="relative z-[2] -mt-16 mb-6 ml-6 h-32 w-32 rounded-xl border-4 border-background bg-background">
        <AvatarImage src={project?.logoUrl} alt={project?.name} className="h-full w-full object-cover" />
        <AvatarFallback>
          <img className="h-full w-full object-cover" src={onlydustLogoSpace?.src} alt={project?.name} />
        </AvatarFallback>
      </Avatar>
      <div className="flex w-full flex-col gap-6 px-6">
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-wrap items-center justify-between gap-1">
            <TypographyH2>{project?.name}</TypographyH2>
            <div className="flex items-center gap-2">
              <ActionHeader projectSlug={project?.slug ?? ""} />
            </div>
          </div>
          <TypographyP className="text-muted-foreground">{project?.shortDescription}</TypographyP>
        </div>
        <div className="flex flex-row flex-wrap divide-x">
          <Categories categories={project?.categories?.map(category => category.name) ?? []} />
          <Languages languages={project?.languages ?? []} />
          <Leads leads={project?.leads ?? []} />
        </div>
        <Stats project={project} />
      </div>
    </div>
  );
}
