import { PropsWithChildren } from "react";

interface ClassNames {
  base: string;
}

export interface PageContentProps extends PropsWithChildren {
  classNames?: Partial<ClassNames>;
}
