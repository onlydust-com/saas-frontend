import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";

import { RemixIconsName } from "@/design-system/atoms/icon/adapters/remix-icon/remix-icon-names.types";
import { RemixIcon } from "@/design-system/atoms/icon/variants/icon-remix";
import { Paper, PaperLoading } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { HackathonEventsProps } from "./hackathon-events.types";

export function HackathonEvents({ hackathonSlug }: HackathonEventsProps) {
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

  return (
    <Paper
      background="glass"
      border="primary"
      classNames={{ base: "flex flex-col divide-y divide-border-primary" }}
      size="none"
    >
      <div className="p-xl">
        <Typo
          variant="heading"
          size="xs"
          weight="medium"
          classNames={{ base: "text-sm" }}
          translate={{ token: "hackathon:details.events.title" }}
        />
      </div>

      {hackathon.events.map(event => {
        const formattedDates = event.formatDisplayDates();

        return (
          <div
            key={event.name}
            className={cn("flex items-start gap-xl p-xl", {
              "opacity-50": event.isPast(),
            })}
          >
            <div className="flex h-12 w-12 flex-col items-center justify-center rounded-md bg-[#121212]">
              <div className="flex flex-col text-center">
                <Typo size="xs">{formattedDates.startMonth}</Typo>
                <Typo size="xs" weight="medium">
                  {formattedDates.startDay}
                </Typo>
              </div>
            </div>

            <div className="flex flex-col gap-md">
              <div className="flex flex-col">
                <Typo size="sm" weight="bold">
                  {event.name}
                </Typo>
                <Typo size="xs" color="tertiary">
                  {event.subtitle}
                </Typo>
              </div>

              <Typo size="xs">
                {formattedDates.startDate} - {formattedDates.startTime}
              </Typo>
            </div>

            <div className="flex h-full items-center justify-center">
              <RemixIcon name={event.iconSlug as RemixIconsName} classNames={{ base: "text-foreground-tertiary" }} />
            </div>
          </div>
        );
      })}
    </Paper>
  );
}
