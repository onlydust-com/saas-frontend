import logoWhite from "@/public/images/logos/logo-white.svg";
import { ArrowRight, CornerDownLeft } from "lucide-react";
import Image from "next/image";

import { HackathonSummaryProps } from "@/app/hackathons/[hackathonSlug]/_features/hackathon-summary/hackathon-summary.types";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";

import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
import { PaperLoading } from "@/design-system/atoms/paper";
import { Paper } from "@/design-system/atoms/paper/variants/paper-default";
import { Typo } from "@/design-system/atoms/typo";

import { BaseLink } from "@/shared/components/base-link/base-link";

export function HackathonSummary({ hackathonSlug }: HackathonSummaryProps) {
  const {
    data: hackathon,
    isLoading,
    isError,
  } = HackathonReactQueryAdapter.client.useGetHackathonBySlug({
    pathParams: {
      hackathonSlug,
    },
    options: {
      enabled: Boolean(hackathonSlug),
    },
  });

  if (isLoading) {
    return <PaperLoading classNames={{ base: "h-[200px]" }} />;
  }

  if (isError || !hackathon) return null;

  const formattedDates = hackathon.formatDisplayDates();

  const allLinks = hackathon.communityLinks?.concat(hackathon.links) ?? [];

  return (
    <Paper
      background="primary"
      border="primary"
      classNames={{ base: "flex flex-col divide-y divide-border-primary" }}
      size="none"
    >
      <div className="px-xl py-lg">
        <div className="flex items-center gap-xl">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-utility-brand-electricroyalblue-600 outline outline-2 -outline-offset-1 outline-components-avatar-border">
            <Image src={logoWhite} alt={hackathon.title} width={24} height={24} className={"size-7"} />
          </div>

          <Typo size={"xs"} variant="heading">
            {hackathon.title}
          </Typo>
        </div>
      </div>

      {formattedDates ? (
        <div className="flex flex-col gap-lg px-xl py-lg">
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

      {allLinks.length > 0 ? (
        <div className="flex flex-col gap-lg px-xl py-lg">
          <Typo
            variant="heading"
            size="xs"
            color="tertiary"
            weight="medium"
            classNames={{ base: "text-sm" }}
            translate={{ token: "hackathon:details.summary.links" }}
          />

          <div className="grid gap-md mobile:grid-cols-2">
            {allLinks.map((link, index) => {
              const isFirst = index === 0;

              const urlObject = new URL(link.url);
              const domain = urlObject.hostname;

              return (
                <Paper
                  key={link.url}
                  as={BaseLink}
                  htmlProps={{ href: link.url }}
                  py="lg"
                  px="xl"
                  background={"secondary"}
                  border={"primary"}
                >
                  <div className="relative z-[1] flex items-center gap-sm">
                    <div className="flex flex-1 flex-col gap-xl">
                      <Typo weight="medium" size="sm">
                        {link.value}
                      </Typo>

                      <Badge
                        size="xs"
                        shape="squared"
                        variant={isFirst ? "solid" : "outline"}
                        color={isFirst ? "brand" : "grey"}
                        classNames={{
                          base: "w-fit max-w-[120px]",
                          label: "truncate",
                        }}
                      >
                        {domain}
                      </Badge>
                    </div>

                    <Icon component={CornerDownLeft} color="quaternary" />
                  </div>
                </Paper>
              );
            })}
          </div>
        </div>
      ) : null}
    </Paper>
  );
}
