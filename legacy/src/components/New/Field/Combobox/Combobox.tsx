import ArrowDownSLine from "@/legacy/src/icons/ArrowDownSLine";
import User3Line from "@/legacy/src/icons/User3Line";
import { autoUpdate, flip, useFloating } from "@floating-ui/react-dom";
import { Combobox as HeadlessCombobox, Transition } from "@headlessui/react";

import { cn } from "@/shared/utils";

import { ComboboxState } from "./ComboboxState";
import { ItemType, MultiList } from "./MultiList";
import { SingleList } from "./SingleList";

type Props<T> = {
  renderItem: ({ item, selected, active }: { item: T; selected: boolean; active: boolean }) => JSX.Element;
  query: string;
  onQuery: (query: string) => void;
  placeholder?: string;
  loading?: boolean;
  /**
   * @description name the key for the item object that will be used as key for the item
   */
  itemKeyName: string;
  variant?: Variant;
};

type SingleProps<T> = Props<T> & {
  selected: T;
  onChange: (selected: T) => void;
  multiple: false;
};

type MultipleProps<T> = Props<T> & {
  selected: T[];
  onChange: (selected: T[]) => void;
  multiple: true;
};

type ListProps<T> = SingleProps<T> | MultipleProps<T>;

type SingleListProps<T> = ListProps<T> & {
  isMultiList?: never;
  items: T[];
};

type MultiListProps<T> = ListProps<T> & {
  isMultiList: true;
  items: ItemType<T>[];
};

export enum Variant {
  Default,
  Grey,
}

const variants = {
  [Variant.Default]: "bg-spaceBlue-900",
  [Variant.Grey]: "bg-greyscale-900",
};

export function Combobox<T extends Record<string, unknown>>({
  items,
  renderItem,
  query,
  onQuery,
  selected,
  onChange,
  placeholder,
  multiple = false,
  loading = false,
  itemKeyName,
  isMultiList,
  variant = Variant.Default,
}: SingleListProps<T> | MultiListProps<T>) {
  const { refs, floatingStyles, placement } = useFloating<HTMLButtonElement>({
    middleware: [flip()],
    whileElementsMounted: autoUpdate,
    transform: false,
  });

  return (
    <HeadlessCombobox
      value={selected}
      onChange={e => {
        onChange(e as unknown as T & T[]);
        if (refs.reference.current) {
          refs.reference.current.click();
        }
      }}
      multiple={multiple as false}
    >
      {({ open }) => (
        <div className={cn("relative", { "z-50": open })}>
          <HeadlessCombobox.Button
            as="div"
            ref={refs.setReference}
            className={cn(
              "group relative z-30 flex items-center gap-3 overflow-hidden rounded-lg border px-2.5 py-1.5",
              open
                ? "border-spacePurple-500 bg-spacePurple-900 ring-spacePurple-500 ring-1"
                : "border-greyscale-50/8 focus-within:border-spacePurple-500 focus-within:bg-spacePurple-900 focus-within:ring-spacePurple-500 bg-white/5 focus-within:ring-1"
            )}
          >
            <HeadlessCombobox.Input
              className="font-walsheim text-greyscale-50 placeholder:text-spaceBlue-200 peer w-full border-none bg-transparent text-sm outline-none"
              placeholder={placeholder}
              onChange={event => onQuery(event.target.value)}
              autoComplete="off"
            />
            <User3Line
              className={cn(
                "order-first",
                open ? "text-greyscale-50" : "text-spaceBlue-200 peer-focus:text-greyscale-50"
              )}
              aria-hidden="true"
            />
            {!open ? (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ArrowDownSLine
                  className="group-focus-within:text-red text-spaceBlue-200 peer-focus:text-spacePurple-300 h-5 w-5 peer-focus:opacity-0"
                  aria-hidden="true"
                />
              </div>
            ) : null}
          </HeadlessCombobox.Button>
          <Transition
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              right: "-16px",
              left: "-16px",
              top: placement === "bottom" ? "-24px" : undefined,
              bottom: placement === "top" ? "-12px" : undefined,
            }}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => onQuery("")}
            className={cn(
              "border-greyscale-50/12 shadow-heavy z-20 flex flex-col gap-4 rounded-2xl border p-4",
              {
                "origin-top translate-y-1.5": placement === "bottom",
                "origin-bottom -translate-y-1.5": placement === "top",
              },
              variants[variant]
            )}
          >
            {placement === "bottom" ? <div className="h-9" /> : null}
            <HeadlessCombobox.Options className="divide-greyscale-50/8 text-greyscale-50 scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5 max-h-60 w-full divide-y overflow-auto py-1 text-sm scrollbar-thin focus:outline-none">
              <ComboboxState {...{ items, query, loading, isMultiList }} />

              {isMultiList ? (
                <MultiList {...{ items, itemKeyName, loading, renderItem }} />
              ) : (
                <SingleList {...{ items, itemKeyName, loading, renderItem }} />
              )}
            </HeadlessCombobox.Options>
            {placement === "top" ? <div className="h-9" /> : null}
          </Transition>
        </div>
      )}
    </HeadlessCombobox>
  );
}
