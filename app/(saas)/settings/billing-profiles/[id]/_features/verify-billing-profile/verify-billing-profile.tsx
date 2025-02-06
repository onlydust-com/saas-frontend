import SumsubWebSdk from "@sumsub/websdk-react";
import { PropsWithChildren, useEffect, useState } from "react";

import { createSumsubToken } from "@/app/api/sumsub/handlers";
import { SumsubLevelName } from "@/app/api/sumsub/types";

import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";
import { TypographyMuted } from "@/shared/ui/typography";

export function VerifyBillingProfile({
  children,
  externalId,
  levelName,
}: PropsWithChildren<{ externalId: string; levelName: SumsubLevelName }>) {
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    handleTokenCreation();
  }, []);

  async function handleTokenCreation() {
    try {
      const { token } = await createSumsubToken({ externalId, levelName });
      setToken(token);
    } catch (error) {
      handleError();
      console.error(error);
    }
  }

  function handleExpiration() {
    setToken("");
    handleTokenCreation();
  }

  function handleError() {
    setError(true);
  }

  function renderContent() {
    if (error) {
      return (
        <div className="flex h-full items-center justify-center">
          <TypographyMuted>An error occurred while verifying the billing profile.</TypographyMuted>
        </div>
      );
    }

    if (token) {
      return (
        <SumsubWebSdk
          accessToken={token}
          expirationHandler={handleExpiration}
          config={{ lang: "en" }}
          options={{}}
          onError={handleError}
          className="mt-12 overflow-hidden rounded-sm"
        />
      );
    }

    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent>{renderContent()}</SheetContent>
    </Sheet>
  );
}
