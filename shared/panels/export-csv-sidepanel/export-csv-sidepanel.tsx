import { Button } from "@/design-system/atoms/button/variants/button-default";
import { DateRangePicker } from "@/design-system/atoms/date-range-picker";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { CheckboxButton } from "@/design-system/molecules/checkbox-button";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { Translate } from "@/shared/translation/components/translate/translate";

import { useExportCsvSidepanel } from "./export-csv-sidepanel.hooks";
import { ExportCsvSidepanelProps } from "./export-csv-sidepanel.types";

export function ExportCsvSidepanel({
  types,
  dateRange,
  onDateRange,
  exportedData,
  onExport,
  onClose,
}: ExportCsvSidepanelProps) {
  const { name } = useExportCsvSidepanel();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <SidePanelHeader
        title={{
          translate: { token: "panels:exportCsv.title" },
        }}
        canGoBack
        canClose
        onClose={onClose}
      />

      <SidePanelBody>
        <Paper size="lg" background="primary" border="primary" classNames={{ base: "flex flex-col gap-lg" }}>
          <Typo size="sm" weight="medium" translate={{ token: "panels:exportCsv.types.title" }} />

          <div className="flex flex-wrap items-center gap-xs">
            {types.map((type, index) => (
              <CheckboxButton key={`export-csv-type-${index}`} value={type.value} onChange={type.onChange}>
                <Translate token={type.label} />
              </CheckboxButton>
            ))}
          </div>
        </Paper>

        <Paper size="lg" background="primary" border="primary" classNames={{ base: "flex flex-col gap-lg" }}>
          <Typo size="sm" weight="medium" translate={{ token: "panels:exportCsv.period.title" }} />

          <DateRangePicker value={dateRange} onChange={onDateRange} />
        </Paper>

        <Paper size="lg" background="primary" border="primary" classNames={{ base: "flex flex-col gap-lg" }}>
          <Typo size="sm" weight="medium" translate={{ token: "panels:exportCsv.data.title" }} />

          <div className="flex flex-col gap-xs">
            {exportedData.map((item, index) => (
              <Typo
                key={`export-csv-data-${index}`}
                size="xs"
                color="secondary"
                translate={{
                  token: item,
                }}
              />
            ))}
          </div>
        </Paper>
      </SidePanelBody>

      <SidePanelFooter>
        <Button
          variant="secondary"
          size="md"
          translate={{
            token: "panels:exportCsv.button",
          }}
          onClick={onExport}
        />
      </SidePanelFooter>
    </Panel>
  );
}
