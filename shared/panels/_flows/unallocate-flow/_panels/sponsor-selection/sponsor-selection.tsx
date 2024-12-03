import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "react-use";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { ProgramSponsorListItemInterface } from "@/core/domain/program/models/program-sponsor-list-item";

import { Icon } from "@/design-system/atoms/icon";
import { Input } from "@/design-system/atoms/input";
import { CardProject, CardProjectLoading } from "@/design-system/molecules/cards/card-project";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { useSponsorSelection } from "@/shared/panels/_flows/unallocate-flow/_panels/sponsor-selection/sponsor-selection.hooks";
import { useUnallocateFlow } from "@/shared/panels/_flows/unallocate-flow/unallocate-flow.context";

function Sponsors() {
  const { t } = useTranslation();
  const { programId, selectSponsor } = useUnallocateFlow();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useDebounce(
    () => {
      setDebouncedSearch(search);
    },
    300,
    [search]
  );

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ProgramReactQueryAdapter.client.useGetProgramSponsors({
      pathParams: { programId },
      queryParams: {
        search: debouncedSearch,
      },
      options: {
        enabled: Boolean(programId),
      },
    });

  const flatSponsors = useMemo(() => data?.pages.flatMap(page => page.sponsors) ?? [], [data]);

  function handleSponsorClick(sponsor: ProgramSponsorListItemInterface) {
    selectSponsor(sponsor);
  }

  function renderSponsors() {
    if (isLoading) {
      return (
        <div className={"grid gap-lg"}>
          <CardProjectLoading />
          <CardProjectLoading />
          <CardProjectLoading />
        </div>
      );
    }

    if (isError) {
      return <ErrorState />;
    }

    if (!flatSponsors.length) {
      return <EmptyStateLite />;
    }
    return (
      <>
        {flatSponsors.map(sponsor => {
          return (
            <CardProject
              key={sponsor.id}
              as={"button"}
              onClick={() => handleSponsorClick(sponsor)}
              title={sponsor.name}
              description={sponsor.leads?.[0]?.login}
              logoUrl={sponsor.logoUrl}
            />
          );
        })}
        {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
      </>
    );
  }

  return (
    <div className={"grid gap-lg"}>
      <Input
        name="searchSponsors"
        value={search}
        size="sm"
        onChange={e => setSearch(e.target.value)}
        startContent={<Icon component={Search} classNames={{ base: "text-foreground-tertiary" }} />}
        placeholder={t("panels:unallocateSponsorSelection.search.placeholder")}
      />

      {renderSponsors()}
    </div>
  );
}

export function SponsorSelection() {
  const { name } = useSponsorSelection();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <SidePanelHeader
        title={{
          translate: {
            token: "panels:unallocateSponsorSelection.title",
          },
        }}
        canClose
      />

      <SidePanelBody>
        <Sponsors />
      </SidePanelBody>
    </Panel>
  );
}
