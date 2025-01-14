import logoWhite from "@/public/images/logos/logo-white.svg";
import { ArrowRight, CircleDot, Clock, Folder, User } from "lucide-react";
import Image from "next/image";

import { LiveHackathonCardProps } from "@/app/hackathons/_components/live-hackathon-card/live-hackathon-card.types";

import { bootstrap } from "@/core/bootstrap";

import { Badge } from "@/design-system/atoms/badge/variants/badge-default";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon/variants/icon-default";
import { Paper } from "@/design-system/atoms/paper/variants/paper-default";
import { Typo } from "@/design-system/atoms/typo";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { Stat } from "@/shared/components/stat/stat";
import { NEXT_ROUTER } from "@/shared/constants/router";

export function LiveHackathonCard({ hackathon }: LiveHackathonCardProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const isLive = hackathon.isLive();
  const formattedDates = hackathon.formatDisplayDates();

  return (
    <Paper
      background="transparent"
      border="primary"
      classNames={{ base: "purple-halo-gradient overflow-hidden" }}
      size="none"
    >
      <div className="relative z-[1] flex flex-col divide-y divide-border-primary">
        <div className="flex flex-col justify-between gap-xl px-xl py-lg tablet:flex-row tablet:items-center">
          <div className="flex items-center gap-xl">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-utility-brand-electricroyalblue-600 outline outline-2 -outline-offset-1 outline-components-avatar-border">
              <Image src={logoWhite} alt={hackathon.title} width={24} height={24} className={"size-6"} />
            </div>

            <Typo size={"xs"} variant="heading">
              {hackathon.title}
            </Typo>

            <Badge variant="outline" size="md" color="brand" classNames={{ base: "shrink-0" }}>
              {isLive ? "Live now" : "Coming soon"}
            </Badge>
          </div>

          <Button
            as={BaseLink}
            htmlProps={{ href: NEXT_ROUTER.hackathons.details.root(hackathon.slug) }}
            variant="primary"
            size="md"
            classNames={{ base: "w-full tablet:w-auto" }}
          >
            Join the ODHack
          </Button>
        </div>

        <div className="grid w-full divide-x divide-border-primary border-b-1 border-border-primary mobile:grid-cols-2 tablet:grid-cols-4">
          <div className="border-b border-border-primary p-4 tablet:border-b-0">
            <Stat
              label={{ token: "hackathon:shared.stats.registered" }}
              value={Intl.NumberFormat().format(hackathon.subscriberCount)}
              iconProps={{
                component: User,
                classNames: {
                  base: "text-utility-secondary-yellow-500",
                },
              }}
            />
          </div>
          <div className="border-b border-border-primary p-4 tablet:border-b-0">
            <Stat
              label={{ token: "hackathon:shared.stats.availableIssues" }}
              value={`${Intl.NumberFormat().format(hackathon.openIssueCount)}/${Intl.NumberFormat().format(hackathon.issueCount)}`}
              iconProps={{
                component: CircleDot,
                classNames: {
                  base: "text-utility-secondary-green-500",
                },
              }}
            />
          </div>
          <div className="border-b border-border-primary p-4 tablet:border-b-0">
            <Stat
              label={{ token: "hackathon:shared.stats.projects" }}
              value={Intl.NumberFormat().format(hackathon.projects.length)}
              iconProps={{
                component: Folder,
                classNames: {
                  base: "text-utility-secondary-blue-500",
                },
              }}
            />
          </div>
          <div className="p-4">
            <Stat
              label={{ token: "hackathon:shared.stats.endsIn" }}
              value={
                hackathon.endDate
                  ? dateKernelPort.formatDistanceToNow(new Date(hackathon.endDate), { addSuffix: false })
                  : "-"
              }
              iconProps={{
                component: Clock,
                classNames: {
                  base: "text-foreground-tertiary",
                },
              }}
            />
          </div>
        </div>

        <div className="grid w-full divide-x divide-border-primary border-b-1 border-border-primary mobile:grid-cols-2">
          {formattedDates ? (
            <div className="flex flex-col gap-lg border-b border-border-primary px-xl py-lg mobile:border-b-0">
              <Typo
                variant="heading"
                size="xs"
                color="tertiary"
                weight="medium"
                classNames={{ base: "text-sm" }}
                translate={{ token: "hackathon:details.summary.date" }}
              />
              <div className="flex items-center justify-between gap-lg">
                <div className="flex flex-col">
                  <Typo variant="heading" size="xs">
                    {formattedDates.startDate}
                  </Typo>

                  <Typo weight="medium" size="xs" color="tertiary">
                    {formattedDates.startTime}
                  </Typo>
                </div>

                <Icon component={ArrowRight} color="purple" />

                <div className="flex flex-col text-right">
                  <Typo variant="heading" size="xs">
                    {formattedDates.endDate}
                  </Typo>

                  <Typo weight="medium" size="xs" color="tertiary">
                    {formattedDates.endTime}
                  </Typo>
                </div>
              </div>
            </div>
          ) : null}

          <div className="flex flex-col gap-lg px-xl py-lg">
            <Typo
              variant="heading"
              size="xs"
              color="tertiary"
              weight="medium"
              classNames={{ base: "text-sm" }}
              translate={{ token: "hackathon:details.summary.location" }}
            />
            <Typo variant="heading" size="xs">
              {hackathon.location ?? "Worldwide"}
            </Typo>
          </div>
        </div>
      </div>
    </Paper>
  );
}
