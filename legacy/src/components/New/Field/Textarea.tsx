import { ChangeEventHandler, FocusEventHandler, Ref, forwardRef, useEffect, useRef } from "react";

import { cn } from "@/shared/utils";

import { Field, FieldProps } from "./Field";

export interface FieldTextareaProps extends Omit<FieldProps, "children"> {
  rows?: number;
  className?: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  autogrow?: boolean;
}

export const FieldTextarea = forwardRef(function FieldTextarea(
  { onBlur, rows = 3, onFocus, onChange, className, value, autogrow = false, ...rest }: FieldTextareaProps,
  ref: Ref<HTMLTextAreaElement>
) {
  const textAreaContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autogrow && textAreaContainerRef.current) {
      const textareaEl = textAreaContainerRef.current.querySelector("textarea");
      if (textareaEl) {
        textareaEl.style.height = ""; // This line is required to allow the text area to resize when the user deletes text
        textareaEl.style.height = textareaEl.scrollHeight + "px";
      }
    }
  }, [autogrow, value, textAreaContainerRef]);

  return (
    <Field {...rest}>
      <div
        className={cn(
          "border-greyscale-50/8 focus-within:border-spacePurple-500 focus-within:bg-spacePurple-900 focus-within:ring-spacePurple-500 flex w-full items-center gap-2 rounded-lg border bg-white/5 px-3 py-2 text-sm leading-none focus-within:ring-1",
          rest.errorMessage && "border-orange-500",
          className
        )}
        ref={textAreaContainerRef}
      >
        <textarea
          value={value ?? ""}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={rest.placeholder}
          onFocus={onFocus}
          rows={rows}
          ref={ref}
          className="scrollbar-sm font-walsheim text-greyscale-50 placeholder:text-spaceBlue-200 w-full bg-transparent outline-none"
        />
      </div>
    </Field>
  );
});
