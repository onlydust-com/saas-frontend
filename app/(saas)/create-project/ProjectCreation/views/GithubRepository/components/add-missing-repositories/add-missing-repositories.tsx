import { Tooltip } from "@/design-system/atoms/tooltip";
import { Button } from "@/shared/ui/button";
import { CircleAlert } from "lucide-react";

import { Link } from "@/design-system/atoms/link";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { TypographyMuted } from "@/shared/ui/typography";
import { TAddMissingRepositories } from "./add-missing-repositories.types";

export function AddMissingRepositories({
  url,
  disabled,
  tooltip,
}: TAddMissingRepositories.Props) {
  return (
    <Alert variant="warning" className="space-x-2">
        <CircleAlert />

        <AlertTitle>Missing Repositories ?</AlertTitle>
        <AlertDescription className="flex flex-col gap-2 place-items-start">
          <TypographyMuted>Make sure they are public and the Github app is granted on all of them.</TypographyMuted>

          {disabled ? (
            <Tooltip content={<span>{tooltip}</span>}>
              <Button size="sm" className="whitespace-nowrap" disabled>
                Manage on GitHub
              </Button>
            </Tooltip>
          ) : (
            <Button size="sm" asChild>
              <Link href={url} target="_blank" className="whitespace-nowrap" rel="noreferrer">
                Manage on GitHub
              </Link>
          </Button>
          )}
        </AlertDescription>
      </Alert>
  );
}
