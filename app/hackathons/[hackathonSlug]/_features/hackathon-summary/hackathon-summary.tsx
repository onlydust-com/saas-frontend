import { ArrowRight } from "lucide-react";

import { HackathonSummaryProps } from "@/app/hackathons/[hackathonSlug]/_features/hackathon-summary/hackathon-summary.types";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";

import { Icon } from "@/design-system/atoms/icon";
import { PaperLoading } from "@/design-system/atoms/paper";
import { Paper } from "@/design-system/atoms/paper/variants/paper-default";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelSingle } from "@/design-system/molecules/avatar-label-single/variants/avatar-label-single-default";

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

  return (
    <Paper
      background="glass"
      border="primary"
      classNames={{ base: "flex flex-col divide-y divide-border-primary" }}
      size="none"
    >
      <div className="p-lg">
        <AvatarLabelSingle
          avatar={{
            // src: hackathon.avatar,
            alt: hackathon.title,
          }}
          title={{
            children: hackathon.title,
            variant: "heading",
            size: "xs",
          }}
          size="xl"
          shape="squared"
          truncate={false}
          classNames={{ title: "line-clamp-none" }}
        />
      </div>

      <div className="flex flex-col gap-lg p-lg">
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

      <div className="flex flex-col gap-lg p-lg">
        <Typo
          variant="heading"
          size="xs"
          color="tertiary"
          weight="medium"
          classNames={{ base: "text-sm" }}
          translate={{ token: "hackathon:details.summary.location" }}
        />
        <Typo variant="heading" size="xs">
          {hackathon.location}
        </Typo>
      </div>

      <div className="p-lg">
        <Typo
          variant="heading"
          size="xs"
          color="tertiary"
          weight="medium"
          classNames={{ base: "text-sm" }}
          translate={{ token: "hackathon:details.summary.links" }}
        />
      </div>
    </Paper>
  );
}
