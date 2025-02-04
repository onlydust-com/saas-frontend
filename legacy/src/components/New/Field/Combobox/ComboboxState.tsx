import { Spinner } from "@/legacy/src/components/Spinner/Spinner";

import { ItemType } from "./MultiList";

type StateProps<T> = {
  items: T[] | ItemType<T>[];
  query?: string;
  loading: boolean;
  isMultiList?: boolean;
};

export function ComboboxState<T extends Record<string, unknown>>({
  items,
  query,
  loading,
  isMultiList,
}: StateProps<T>) {
  let hasItems;
  if (isMultiList) {
    hasItems = items.flatMap(item => ("data" in item ? item.data : [])).length > 0;
  } else {
    hasItems = items.length > 0;
  }

  return (
    <>
      {loading ? (
        <div className="text-spacePurple-500 flex justify-center px-4 py-2">
          <Spinner />
        </div>
      ) : !hasItems ? (
        <div className="font-walsheim text-greyscale-50 select-none">
          {!query ? "Type one or more characters to search for a contributor or Github handle" : null}
          {query !== "" ? "Nothing here" : null}
        </div>
      ) : null}
    </>
  );
}
