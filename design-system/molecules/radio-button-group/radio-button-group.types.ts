import { FunctionComponent, ReactNode } from "react";

import { ButtonSolidPort } from "../../atoms/button/button.types";
import { RadioGroupPort } from "../../atoms/radio-group";

type Radio<V extends string> = RadioGroupPort<V, FunctionComponent<CustomButtonProps>>;

export type CustomButtonProps = ButtonSolidPort<"button"> & { label: ReactNode };
export type ButtonProps = Pick<ButtonSolidPort<"div">, "variant" | "size">;
export type RadioGroupProps<V extends string> = Omit<Radio<V>, "items" | "as" | "htmlProps">;

interface ClassNames {
  base: string;
}

export interface RadioGroupButtonPort<V extends string> extends ButtonProps, RadioGroupProps<V> {
  classNames?: Partial<ClassNames>;
  items: Array<
    Radio<V>["items"][0] & {
      label: string;
    }
  >;
}
