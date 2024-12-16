import { cn } from "@nextui-org/react";

import { useGlobalSearch } from "../../global-search.context";

export function Suggestion() {
  const { inputValue, suggestion: _suggestion } = useGlobalSearch();
  const suggestion = _suggestion?.toLocaleLowerCase().replace(inputValue?.toLocaleLowerCase() ?? "", "");

  if (!suggestion || !inputValue) return null;

  return (
    <p
      className={cn([
        "pointer-events-none font-inter text-[1rem] font-normal leading-[1.5rem] text-typography-primary outline-none",
        "absolute left-0 top-1/2 -translate-y-1/2 overflow-hidden",
      ])}
    >
      <span className={"opacity-0"}>{inputValue}</span>
      <span className={"shine-text"}>{suggestion}</span>
    </p>
  );
}
