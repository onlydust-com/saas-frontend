import { Accordion } from "@/design-system/molecules/accordion";

import { GlobalInformationProps } from "./global-information.types";

export function GlobalInformation({ children }: GlobalInformationProps) {
  return (
    <Accordion
      defaultSelected={["general-information"]}
      id={"general-information"}
      titleProps={{ translate: { token: "panels:projectUpdate.globalInformation.title" } }}
    >
      <div className={"flex w-full flex-col gap-md"}>COUCOU</div>
    </Accordion>
  );
}
