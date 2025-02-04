import { useClientBootstrapImpersonation } from "@/core/bootstrap/impersonation/use-client-bootstrap-impersonation";

import { Typo } from "@/design-system/atoms/typo";

export function ImpersonationBanner() {
  const { isImpersonating } = useClientBootstrapImpersonation();

  if (!isImpersonating) return null;

  return (
    <div className={"pointer-events-none fixed bottom-md left-0 right-0 z-10 text-center"}>
      <div className={"relative inline-flex overflow-hidden rounded-xl bg-black p-3"}>
        <div className="absolute inset-0 animate-pulse bg-foreground-warning" />
        <Typo weight={"medium"} classNames={{ base: "relative z-10" }}>
          ⚠️ IMPERSONATING
        </Typo>
      </div>
    </div>
  );
}
