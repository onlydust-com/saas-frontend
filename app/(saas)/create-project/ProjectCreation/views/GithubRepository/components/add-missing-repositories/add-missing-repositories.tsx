import { Tooltip } from "@/design-system/atoms/tooltip";
import { Button } from "@/shared/ui/button";
import { TypographyP } from "@/shared/ui/typography";
import { CircleAlert } from "lucide-react";

import { Link } from "@/design-system/atoms/link";
import { TAddMissingRepositories } from "./add-missing-repositories.types";

export function AddMissingRepositories({
  url,
  disabled,
  tooltip,
  className,
}: TAddMissingRepositories.Props) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center h-8 w-8 rounded-large bg-white/8 p-2">
          <CircleAlert />
        </div>

        <div className="flex flex-col">
          <TypographyP>
            Missing Repositories ?
          </TypographyP>

          <TypographyP>
            Make sure they are public and the Github app is granted on all of them.
          </TypographyP>
        </div>
      </div>

      {disabled ? (
        <Tooltip content={<span>{tooltip}</span>}>
          <Button size="sm" className="whitespace-nowrap" disabled>
            Manage on GitHub
          </Button>
        </Tooltip>
      ) : (
        <Button asChild>
          <Link href={url} target="_blank" className="whitespace-nowrap" rel="noreferrer">
            Manage on GitHub
          </Link>
      </Button>
      )}
    </div>
  );
}
