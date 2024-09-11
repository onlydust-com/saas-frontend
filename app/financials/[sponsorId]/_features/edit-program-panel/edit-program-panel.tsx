import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useEditProgramPanel } from "@/app/financials/[sponsorId]/_features/edit-program-panel/edit-program-panel.hooks";
import { editProgramPanelFormValidation } from "@/app/financials/[sponsorId]/_features/edit-program-panel/edit-program-panel.types";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { EditProgramBody } from "@/core/domain/program/program-contract.types";
import { CreateSponsorProgramBody } from "@/core/domain/sponsor/sponsor-contract.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Input } from "@/design-system/atoms/input";
import { Accordion } from "@/design-system/molecules/accordion";
import { ImageInput } from "@/design-system/molecules/image-input";
import { toast } from "@/design-system/molecules/toaster";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { UserAutocomplete } from "@/shared/features/user/user-autocomplete/user-autocomplete";
import { Translate } from "@/shared/translation/components/translate/translate";

export function EditProgramPanel() {
  const { name } = useEditProgramPanel();
  const { t } = useTranslation("financials");
  const { close } = useSidePanelsContext();
  const { Panel } = useSidePanel({ name });
  const { programId, sponsorId } = useSinglePanelData<{ programId: string; sponsorId?: string }>(name) ?? {
    programId: "",
  };
  const { data: program } = ProgramReactQueryAdapter.client.useGetProgramById({
    pathParams: { programId },
    options: { enabled: !!programId },
  });
  const { mutateAsync: uploadLogo } = ProgramReactQueryAdapter.client.useUploadProgramLogo();
  const { mutateAsync: createProgram } = ProgramReactQueryAdapter.client.useEditProgram({
    pathParams: { programId },
    queryParams: {
      sponsorId,
    },
  });

  const { control, handleSubmit, reset } = useForm<EditProgramBody & { logoFile?: File }>({
    resolver: zodResolver(editProgramPanelFormValidation),
  });

  async function onUpdateProgram({ logoFile, ...data }: EditProgramBody & { logoFile?: File }) {
    try {
      const fileUrl = logoFile ? await uploadLogo(logoFile) : undefined;

      const createProgramData: CreateSponsorProgramBody = {
        ...data,
        logoUrl: fileUrl?.url || program?.logoUrl,
      };

      await createProgram(createProgramData);

      close();
      toast.success(<Translate token={"financials:editProgramPanel.messages.success"} />);
    } catch {
      toast.error(<Translate token={"financials:editProgramPanel.messages.error"} />);
    }
  }

  useEffect(() => {
    if (program) {
      reset({
        name: program.name,
        url: program.url,
        logoUrl: program.logoUrl,
        // TODO WHEN BACKEND READY
        leadIds: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [program]);

  return (
    <Panel>
      <form onSubmit={handleSubmit(onUpdateProgram)} className={"flex h-full w-full flex-col gap-px"}>
        <SidePanelHeader
          title={{
            children: program?.name ?? "",
          }}
          canGoBack={false}
          canClose={true}
        />

        <SidePanelBody>
          <Accordion
            id={"general-information"}
            titleProps={{ translate: { token: "financials:editProgramPanel.informations.title" } }}
          >
            <div className={"flex w-full flex-col gap-md"}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    label={<Translate token={"financials:editProgramPanel.informations.name.label"} />}
                    placeholder={t("editProgramPanel.informations.name.placeholder")}
                    {...field}
                  />
                )}
              />
              <Controller
                name="url"
                control={control}
                render={({ field }) => (
                  <Input
                    label={<Translate token={"financials:editProgramPanel.informations.url.label"} />}
                    placeholder={t("editProgramPanel.informations.url.placeholder")}
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
                    label={<Translate token={"financials:editProgramPanel.informations.lead.label"} />}
                    placeholder={t("editProgramPanel.informations.lead.placeholder")}
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
                    value={program?.logoUrl}
                    label={<Translate token={"financials:editProgramPanel.informations.image.label"} />}
                    onChange={onChange}
                    buttonProps={{
                      children: <Translate token={"financials:editProgramPanel.informations.image.buttonLabel"} />,
                    }}
                  />
                )}
              />
            </div>
          </Accordion>
        </SidePanelBody>
        <SidePanelFooter>
          <Button variant={"secondary"} type={"submit"} translate={{ token: "financials:editProgramPanel.submit" }} />
        </SidePanelFooter>
      </form>
    </Panel>
  );
}
