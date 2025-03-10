import githubPermissionImage from "@/public/images/github/github-permission.png";
import { Github, SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { TypographyMuted, TypographyP } from "@/shared/ui/typography";

import { GithubPublicScopePermissionModalProps } from "./github-public-scope-permission-modal.types";

export function GithubPublicScopePermissionModal({
  isOpen,
  onOpenChange,
  onRedirect,
}: GithubPublicScopePermissionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Grant permissions</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-lg">
          <Image
            src={githubPermissionImage}
            alt="Github permission"
            className="h-full w-full object-cover object-center"
            loading={"lazy"}
            width={320}
            height={50}
            quality={100}
          />

          <TypographyP className="leading-tight">
            We need your permission to write comments on your behalf and apply to selected issues directly on OnlyDust.
            Only need to be accepted once.
          </TypographyP>

          <TypographyMuted>
            Click on "Grant Permissions". A GitHub popup will appear. Click on "Authorize OnlyDust", and you'll be
            redirected back here to submit your application.
          </TypographyMuted>
        </div>

        <DialogFooter>
          <Button onClick={onRedirect}>
            <Github />
            Write all public repository data
            <SquareArrowOutUpRight />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
