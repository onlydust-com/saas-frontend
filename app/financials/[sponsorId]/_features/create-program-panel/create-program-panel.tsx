import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { CreateProgramPanelProps } from "@/app/financials/[sponsorId]/_features/create-program-panel/create-program-panel.types";

import { CreateSponsorProgramBody } from "@/core/domain/sponsor/sponsor-contract.types";

import { Input } from "@/design-system/atoms/input";
import { Accordion } from "@/design-system/molecules/accordion";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { UserAutocomplete } from "@/shared/features/user/user-autocomplete/user-autocomplete";
import { Translate } from "@/shared/translation/components/translate/translate";

const validation = z.object({
  motivations: z.string().min(1),
  name: z.string().min(1),
  url: z.string().min(1),
  logoUrl: z.string().optional(),
  leadIds: z.array(z.number()).min(0),
});

export function CreateProgramPanel({ sponsorId }: CreateProgramPanelProps) {
  const { t } = useTranslation("financials");
  const { control, handleSubmit } = useForm<Omit<CreateSponsorProgramBody, "leadIds"> & { leadIds: number[] }>({
    resolver: zodResolver(validation),
  });

  function onCreateProgram(data: Omit<CreateSponsorProgramBody, "leadIds"> & { leadIds: number[] }) {
    console.log(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onCreateProgram)}>
        <SidePanelHeader
          title={{
            translate: { token: "financials:createProgramPanel.title" },
          }}
          canGoBack={false}
          canClose={true}
        />

        <SidePanelBody>
          <Accordion
            id={"general-information"}
            titleProps={{ translate: { token: "financials:createProgramPanel.informations.title" } }}
          >
            <div className={"flex w-full flex-col gap-md"}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    label={<Translate token={"financials:createProgramPanel.informations.name.label"} />}
                    placeholder={t("createProgramPanel.informations.name.placeholder")}
                    {...field}
                  />
                )}
              />
              <Controller
                name="url"
                control={control}
                render={({ field }) => (
                  <Input
                    label={<Translate token={"financials:createProgramPanel.informations.url.label"} />}
                    placeholder={t("createProgramPanel.informations.url.placeholder")}
                    {...field}
                  />
                )}
              />
              <Controller
                name="leadIds"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <UserAutocomplete
                    label={<Translate token={"financials:createProgramPanel.informations.lead.label"} />}
                    placeholder={t("createProgramPanel.informations.lead.placeholder")}
                    onSelect={onChange}
                    selectedUser={value}
                  />
                )}
              />
            </div>
          </Accordion>
        </SidePanelBody>
      </form>
    </>
  );
}
