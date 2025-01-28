import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useEditProgramPanel } from "@/app/(saas)/financials/[sponsorId]/programs/_features/edit-program-panel/edit-program-panel.hooks";
import { editProgramPanelFormValidation } from "@/app/(saas)/financials/[sponsorId]/programs/_features/edit-program-panel/edit-program-panel.types";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { EditProgramBody } from "@/core/domain/program/program-contract.types";
import { CreateSponsorProgramBody } from "@/core/domain/sponsor/sponsor-contract.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Input } from "@/design-system/atoms/input";
import { Accordion } from "@/design-system/molecules/accordion";
import { CardTransaction } from "@/design-system/molecules/cards/card-transaction";
import { ImageInput } from "@/design-system/molecules/image-input";
import { MenuItemPort } from "@/design-system/molecules/menu-item";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { UserUuidAutocomplete } from "@/shared/features/user/user-uuid-autocomplete/user-uuid-autocomplete";
import { Translate } from "@/shared/translation/components/translate/translate";

export function EditProgramPanel() {
  const { name } = useEditProgramPanel();
  const { t } = useTranslation("financials");
  const { close } = useSidePanelsContext();
  const { Panel } = useSidePanel({ name });
  const { programId, sponsorId } = useSinglePanelData<{ programId: string; sponsorId?: string }>(name) ?? {
    programId: "",
  };
  const [initialLeads, setInitialLeads] = useState<MenuItemPort[]>();

  const { data: program } = ProgramReactQueryAdapter.client.useGetProgramById({
    pathParams: { programId },
    options: { enabled: !!programId },
  });

  const {
    data: transactions,
    fetchNextPage,
    isPending,
    hasNextPage,
  } = ProgramReactQueryAdapter.client.useGetProgramTransactions({
    pathParams: { programId },
    options: {
      enabled: !!programId,
    },
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
        leadIds: program?.leads.map(l => l.id) || [],
      });

      setInitialLeads(
        program?.leads.map(l => ({ id: l.id, label: l.login, searchValue: l.login, avatar: { src: l.avatarUrl } })) ??
          []
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [program]);

  const flatTransactions = useMemo(
    () => transactions?.pages.flatMap(({ transactions }) => transactions) ?? [],
    [transactions]
  );

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
          <div className={"flex h-full flex-col gap-lg overflow-hidden"}>
            <Accordion
              defaultSelected={["general-information"]}
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
                    <UserUuidAutocomplete
                      name={name}
                      label={<Translate token={"financials:editProgramPanel.informations.lead.label"} />}
                      placeholder={t("editProgramPanel.informations.lead.placeholder")}
                      onSelect={onChange}
                      selectedUser={value}
                      isMultiple={true}
                      initialUsers={initialLeads}
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
            <div className={"flex-1 overflow-hidden"}>
              {flatTransactions.length ? (
                <ScrollView>
                  <Accordion
                    id={"transactions"}
                    titleProps={{ translate: { token: "financials:editProgramPanel.transactions.title" } }}
                  >
                    <>
                      {flatTransactions.map(transaction => (
                        <div key={transaction?.id}>
                          <CardTransaction
                            type={transaction.type}
                            date={transaction.date}
                            amount={{
                              value: transaction.amount.amount,
                              currency: transaction.amount.currency,
                              usdEquivalent: transaction.amount.usdEquivalent,
                            }}
                            size={"none"}
                            background={"transparent"}
                            border={"none"}
                          />
                        </div>
                      ))}
                      {hasNextPage && <ShowMore onNext={fetchNextPage} loading={isPending} />}
                    </>
                  </Accordion>
                </ScrollView>
              ) : null}
            </div>
          </div>
        </SidePanelBody>
        <SidePanelFooter>
          <Button variant={"primary"} type={"submit"} translate={{ token: "financials:editProgramPanel.submit" }} />
        </SidePanelFooter>
      </form>
    </Panel>
  );
}
