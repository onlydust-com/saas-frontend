import { Combobox as HeadlessCombobox } from "@headlessui/react";
import { Fragment } from "react";

import { cn } from "@/shared/utils";

export type ItemType<T> = {
  label?: string;
  data: T[];
};

type MultiProps<T> = {
  items: ItemType<T>[];
  itemKeyName: string;
  loading: boolean;
  renderItem: ({ item, selected, active }: { item: T; selected: boolean; active: boolean }) => JSX.Element;
};

export function MultiList<T>({ items, itemKeyName, loading, renderItem }: MultiProps<T>) {
  const filteredItems = items.flatMap(item => item).filter(({ data }) => data.length > 0);

  if (filteredItems.length === 0 || loading) return null;

  return (
    <>
      {filteredItems?.map((item, index) => (
        <Fragment key={`${item?.label} + index`}>
          {item.label && item.data.length > 0 ? (
            <div
              className={cn("text-body-s-bold text-spaceBlue-200 border-none py-2 uppercase", {
                "pt-6": index > 0,
              })}
            >
              {item.label}
            </div>
          ) : null}
          {item.data.map((value: T, key) => {
            return (
              <HeadlessCombobox.Option
                key={value[itemKeyName as keyof T]?.toString() || key}
                className={({ active }) =>
                  cn("relative cursor-pointer select-none py-2", {
                    "bg-white/2": active,
                    "border-none": item.label && key === 0,
                  })
                }
                value={value}
              >
                {({ selected, active }) => renderItem({ item: value, selected, active })}
              </HeadlessCombobox.Option>
            );
          })}
        </Fragment>
      ))}
    </>
  );
}
