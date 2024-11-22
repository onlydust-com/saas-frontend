import { useCallback, useState } from "react";

import { DepositButton } from "@/app/financials/[sponsorId]/_views/financial/deposit-button/deposit-button";
import { Financial } from "@/app/financials/[sponsorId]/_views/financial/financial";
import { AllocateButton } from "@/app/financials/[sponsorId]/_views/programs/allocate-button/allocate-button";
import { CreateButton } from "@/app/financials/[sponsorId]/_views/programs/create-button/create-button";
import { Programs } from "@/app/financials/[sponsorId]/_views/programs/programs";
import { ViewsProps } from "@/app/financials/[sponsorId]/_views/views.types";

import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { Translate } from "@/shared/translation/components/translate/translate";

enum FinancialViews {
  "PROGRAMS" = "PROGRAMS",
  "FINANCIAL" = "FINANCIAL",
}

export function Views({ sponsorId }: ViewsProps) {
  const { close } = useSidePanelsContext();

  const [view, setView] = useState<FinancialViews>(FinancialViews.PROGRAMS);
  const isViewPrograms = view === FinancialViews.PROGRAMS;
  const isViewFinancial = view === FinancialViews.FINANCIAL;

  const renderView = useCallback(() => {
    if (isViewPrograms) {
      return <Programs sponsorId={sponsorId} />;
    }

    if (isViewFinancial) {
      return <Financial />;
    }

    return null;
  }, [isViewPrograms, isViewFinancial]);

  const renderActions = useCallback(() => {
    if (isViewPrograms) {
      return (
        <>
          <CreateButton sponsorId={sponsorId} />
          <AllocateButton sponsorId={sponsorId} />
        </>
      );
    }

    if (isViewFinancial) {
      return <DepositButton sponsorId={sponsorId} />;
    }

    return null;
  }, [isViewPrograms, isViewFinancial]);

  function handleToggleView(view: string) {
    close();
    setView(view as FinancialViews);
  }

  return (
    <div className="flex h-full flex-col gap-lg">
      <header className="flex flex-col flex-wrap items-start justify-between gap-md tablet:flex-row tablet:items-center">
        <Tabs
          onTabClick={handleToggleView}
          variant={"solid"}
          tabs={[
            {
              id: FinancialViews.PROGRAMS,
              children: <Translate token={"programs:details.views.projects"} />,
            },
            {
              id: FinancialViews.FINANCIAL,
              children: <Translate token={"programs:details.views.financial"} />,
            },
          ]}
          selectedId={view}
        />

        <div className="flex items-center gap-lg">{renderActions()}</div>
      </header>

      {renderView()}
    </div>
  );
}
