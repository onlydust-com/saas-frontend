import { PropsWithChildren } from "react";

export function PageContainer({ children }: PropsWithChildren) {
  return <div className="page-container mx-auto w-full max-w-[1180px] px-4 py-6 pb-20">{children}</div>;
}
