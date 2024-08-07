import { PropsWithChildren } from "react";

import { BaseLinkProps } from "@/shared/components/base-link/base-link.types";

type _BaseLinkProps = Omit<BaseLinkProps, "children" | "style">;

interface Variants {
  color: "default" | "inverse";
}

interface ClassNames {
  base: string;
}

export interface LinkPort extends _BaseLinkProps, Partial<Variants>, PropsWithChildren {
  classNames?: Partial<ClassNames>;
}
