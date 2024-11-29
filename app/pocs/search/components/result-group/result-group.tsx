import { Result } from "@/app/pocs/search/components/result/result";

import { Typo } from "@/design-system/atoms/typo";

import { ResultGroupProps } from "./result-group.types";

export function ResultGroup({ indice, data }: ResultGroupProps) {
  if (!data?.filter(Boolean)?.length) {
    return null;
  }

  return (
    <div className={"flex w-full flex-col gap-3"}>
      <div className={"flex w-full flex-row items-center justify-start gap-2"}>
        <Typo size={"lg"}>{indice}</Typo>
        <div className={"h-[1px] flex-1 bg-border-primary"} />
      </div>
      {data?.map((item, i) => <Result data={item} key={item?.getId() ?? i} />)}
    </div>
  );
}
