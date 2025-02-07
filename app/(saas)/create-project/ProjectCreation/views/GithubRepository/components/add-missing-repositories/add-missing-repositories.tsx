import { CircleAlert } from "lucide-react";
import Link from "next/link";

import { Tooltip } from "@/design-system/atoms/tooltip";

import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { TypographyMuted } from "@/shared/ui/typography";

import { TAddMissingRepositoriesProps } from "./add-missing-repositories.types";

export function AddMissingRepositories({ url, disabled, tooltip }: TAddMissingRepositoriesProps) {
  return (
    <Alert variant="warning" className="space-x-2">
      <CircleAlert />

      <AlertTitle>Missing Repositories ?</AlertTitle>
      <AlertDescription className="flex flex-col place-items-start gap-2">
        <TypographyMuted>Make sure they are public and the Github app is granted on all of them.</TypographyMuted>

        {disabled ? (
          <Tooltip content={<span>{tooltip}</span>}>
            <Button size="sm" className="whitespace-nowrap" disabled>
              Manage on GitHub
            </Button>
          </Tooltip>
        ) : (
          <Button size="sm" asChild>
            <Link href={url} target="_blank" className="whitespace-nowrap" rel="noreferrer noopener">
              Manage on GitHub
            </Link>
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
