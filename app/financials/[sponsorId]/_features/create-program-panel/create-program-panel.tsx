import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  CreateProgramPanelProps,
  createProgramPanelFormValidation,
} from "@/app/financials/[sponsorId]/_features/create-program-panel/create-program-panel.types";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { SponsorReactQueryAdapter } from "@/core/application/react-query-adapter/sponsor";
import { CreateSponsorProgramBody } from "@/core/domain/sponsor/sponsor-contract.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Input } from "@/design-system/atoms/input";
import { Accordion } from "@/design-system/molecules/accordion";
import { ImageInput } from "@/design-system/molecules/image-input";
import { toast } from "@/design-system/molecules/toaster";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { UserAutocomplete } from "@/shared/features/user/user-autocomplete/user-autocomplete";
import { Translate } from "@/shared/translation/components/translate/translate";

export function CreateProgramPanel({ sponsorId }: CreateProgramPanelProps) {
  const { t } = useTranslation("financials");
  const { close } = useSidePanelsContext();
  const { mutateAsync: uploadLogo } = ProgramReactQueryAdapter.client.useUploadProgramLogo();
  const { mutateAsync: createProgram } = SponsorReactQueryAdapter.client.useCreateSponsorProgram({
    pathParams: { sponsorId },
  });
  const { control, handleSubmit } = useForm<CreateSponsorProgramBody & { logoFile?: File }>({
    resolver: zodResolver(createProgramPanelFormValidation),
  });

  async function onCreateProgram({ logoFile, ...data }: CreateSponsorProgramBody & { logoFile?: File }) {
    try {
      const fileUrl = logoFile ? await uploadLogo(logoFile) : undefined;

      const createProgramData: CreateSponsorProgramBody = {
        ...data,
        logoUrl: fileUrl?.url,
      };

      await createProgram(createProgramData);

      close();
      toast.success(<Translate token={"financials:createProgramPanel.messages.success"} />);
    } catch {
      toast.error(<Translate token={"financials:createProgramPanel.messages.error"} />);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onCreateProgram)} className={"flex h-full w-full flex-col gap-px"}>
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
                render={({ field: { onChange, value, name } }) => (
                  <UserAutocomplete
                    withInternalUserOnly={true}
                    name={name}
                    label={<Translate token={"financials:createProgramPanel.informations.lead.label"} />}
                    placeholder={t("createProgramPanel.informations.lead.placeholder")}
                    onSelect={onChange}
                    selectedUser={value}
                  />
                )}
              />
              <Controller
                name="logoFile"
                control={control}
                render={({ field: { onChange, name } }) => (
                  <ImageInput
                    name={name}
                    label={<Translate token={"financials:createProgramPanel.informations.image.label"} />}
                    onChange={onChange}
                    buttonProps={{
                      children: <Translate token={"financials:createProgramPanel.informations.image.buttonLabel"} />,
                    }}
                  />
                )}
              />
            </div>
          </Accordion>
        </SidePanelBody>
        <SidePanelFooter>
          <Button variant={"secondary"} type={"submit"} translate={{ token: "financials:createProgramPanel.submit" }} />
        </SidePanelFooter>
      </form>
    </>
  );
}
