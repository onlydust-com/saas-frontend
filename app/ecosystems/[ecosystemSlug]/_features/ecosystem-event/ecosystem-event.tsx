import { ChevronRight } from "lucide-react";
import { useState } from "react";

import { EcosystemReactQueryAdapter } from "@/core/application/react-query-adapter/ecosystem";
import { bootstrap } from "@/core/bootstrap";

import { Icon } from "@/design-system/atoms/icon";
import { PaperLoading } from "@/design-system/atoms/paper/paper.loading";
import { Paper } from "@/design-system/atoms/paper/variants/paper-default";
import { Typo } from "@/design-system/atoms/typo";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { cn } from "@/shared/helpers/cn";

import { EcosystemEventMenu } from "../../_components/ecosystem-event-menu/ecosystem-event-menu";
import { EcosystemEventMenuItem } from "../../_components/ecosystem-event-menu/ecosystem-event-menu.types";
import { EcosystemEventProps } from "./ecosystem-event.types";

export function EcosystemEvent({ ecosystemSlug }: EcosystemEventProps) {
  const [selectedEvent, setSelectedEvent] = useState<EcosystemEventMenuItem>(EcosystemEventMenuItem.ALL_EVENTS);

  const dateKernelPort = bootstrap.getDateKernelPort();

  const periods = {
    [EcosystemEventMenuItem.ALL_EVENTS]: {
      fromDate: undefined,
      toDate: undefined,
    },
    [EcosystemEventMenuItem.PAST_EVENTS]: {
      fromDate: undefined,
      toDate: dateKernelPort.format(new Date(), "yyyy-MM-dd"),
    },
    [EcosystemEventMenuItem.UPCOMING_EVENTS]: {
      fromDate: dateKernelPort.format(new Date(), "yyyy-MM-dd"),
      toDate: undefined,
    },
  };

  const { data, isLoading, isError } = EcosystemReactQueryAdapter.client.useGetEcosystemEvents({
    pathParams: {
      slug: ecosystemSlug,
    },
    queryParams: {
      fromDate: periods[selectedEvent].fromDate,
      toDate: periods[selectedEvent].toDate,
    },
    options: {
      enabled: Boolean(ecosystemSlug),
    },
  });

  if (isLoading) {
    return <PaperLoading classNames={{ base: "h-[200px]" }} />;
  }

  if (isError || !data) return null;

  return (
    <Paper
      background="glass"
      border="primary"
      classNames={{ base: "flex flex-col divide-y divide-border-primary" }}
      size="none"
    >
      <div className="flex items-center justify-between p-xl">
        <Typo
          variant="heading"
          size="xs"
          weight="medium"
          classNames={{ base: "text-sm" }}
          translate={{ token: "ecosystems:details.events.title" }}
        />

        <EcosystemEventMenu selectedEvent={selectedEvent} onAction={setSelectedEvent} />
      </div>

      {data.events.length ? (
        data.events.map(event => {
          const formattedDates = event.formatDisplayDates();

          return (
            <BaseLink href={event.link} key={event.name}>
              <div
                className={cn("flex items-start gap-xl p-xl", {
                  "opacity-50": event.isPast(),
                })}
              >
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-md bg-[#121212]">
                  <div className="flex flex-col text-center">
                    <Typo size="xs">{formattedDates.startMonth}</Typo>
                    <Typo size="xs" weight="medium">
                      {formattedDates.startDay}
                    </Typo>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-md">
                  <div className="flex flex-col">
                    <Typo size="sm" weight="bold">
                      {event.name}
                    </Typo>
                    <Typo size="xs" color="tertiary">
                      {event.description}
                    </Typo>
                  </div>

                  <Typo size="xs">
                    {formattedDates.startDate} - {formattedDates.startTime}
                  </Typo>
                </div>

                <div className="flex items-center self-center">
                  <Icon component={ChevronRight} />
                </div>
              </div>
            </BaseLink>
          );
        })
      ) : (
        <EmptyStateLite />
      )}
    </Paper>
  );
}
