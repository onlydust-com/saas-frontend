import logoWhite from "@/public/images/logos/logo-white.svg";
import { ArrowRight, CircleDot, Folder, User } from "lucide-react";
import Image from "next/image";

import { ClosedHackathonCardProps } from "@/app/hackathons/_components/closed-hackathon-card/closed-hackathon-card.types";

import { Badge } from "@/design-system/atoms/badge/variants/badge-default";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon/variants/icon-default";
import { Paper } from "@/design-system/atoms/paper/variants/paper-default";
import { Typo } from "@/design-system/atoms/typo";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { Stat } from "@/shared/components/stat/stat";
import { NEXT_ROUTER } from "@/shared/constants/router";

export function ClosedHackathonCard({ hackathon }: ClosedHackathonCardProps) {
  const formattedDates = hackathon.formatDisplayDates();

  return (
    <Paper
      as={BaseLink}
      htmlProps={{ href: NEXT_ROUTER.hackathons.details.root(hackathon.slug) }}
      background="transparent"
      border="primary"
      classNames={{ base: "block purple-halo-gradient overflow-hidden hover:opacity-80" }}
      size="none"
    >
      <div className="relative z-[1] flex flex-col divide-y divide-border-primary">
        <div className="flex items-center justify-between gap-xl px-xl py-lg">
          <div className="flex items-center gap-xl">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-utility-brand-electricroyalblue-600 outline outline-2 -outline-offset-1 outline-components-avatar-border">
              <Image src={logoWhite} alt={hackathon.title} width={24} height={24} className={"size-6"} />
            </div>

            <Typo size={"xs"} variant="heading">
              {hackathon.title}
            </Typo>
          </div>

          <Badge
            variant="outline"
            size="md"
            classNames={{ base: "shrink-0" }}
            translate={{ token: "hackathon:shared.status.closed" }}
          />
        </div>

        <div className="grid w-full border-b-1 border-border-primary mobile:grid-cols-3 mobile:py-4">
          <div className="border-b-1 border-border-primary p-4 mobile:border-b-0 mobile:border-r-1 mobile:py-0">
            <Stat
              label={"Registered"}
              value={Intl.NumberFormat().format(hackathon.subscriberCount)}
              iconProps={{
                component: User,
                classNames: {
                  base: "text-utility-secondary-yellow-500",
                },
              }}
            />
          </div>
          <div className="border-b-1 border-border-primary p-4 mobile:border-b-0 mobile:border-r-1 mobile:py-0">
            <Stat
              label={"Available issues"}
              value={`${Intl.NumberFormat().format(hackathon.openIssueCount)}/${Intl.NumberFormat().format(hackathon.issueCount)}`}
              iconProps={{
                component: CircleDot,
                classNames: {
                  base: "text-utility-secondary-green-500",
                },
              }}
            />
          </div>
          <div className="p-4 mobile:py-0">
            <Stat
              label={"Projects"}
              value={Intl.NumberFormat().format(hackathon.projects?.length ?? 0)}
              iconProps={{
                component: Folder,
                classNames: {
                  base: "text-utility-secondary-blue-500",
                },
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-lg px-xl pb-xl pt-lg">
          {formattedDates ? (
            <div className="flex items-center justify-between gap-xl">
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
          ) : null}

          <Button
            as={BaseLink}
            htmlProps={{ href: NEXT_ROUTER.hackathons.details.root(hackathon.slug) }}
            variant="secondary"
            size="md"
            classNames={{ base: "w-full" }}
            translate={{ token: "hackathon:shared.button.explore" }}
          />
        </div>
      </div>
    </Paper>
  );
}
