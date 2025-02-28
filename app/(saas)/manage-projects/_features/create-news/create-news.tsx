import { FilloutStandardEmbed } from "@fillout/react";
import { useState } from "react";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";

import { CreateNewsProps } from "./create-news.types";

const filloutId = process.env.NEXT_PUBLIC_OD_NEWS_FORM_ID ?? "";

export function CreateNews({ project, children }: CreateNewsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthUser();

  const prefillParams = {
    projectId: project.id,
    githubUserId: user?.githubUserId?.toString(),
    createdByAvatar: user?.avatarUrl,
    createdByLogin: user?.login,
    projectLogoUrl: project?.logoUrl,
    projectName: project?.name,
    projectSlug: project?.slug,
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <div className="cursor-pointer">
          <div className="pointer-events-none">{children}</div>
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-8">
        <SheetHeader>
          <SheetTitle>Create news</SheetTitle>
        </SheetHeader>
        <FilloutStandardEmbed filloutId={filloutId} inheritParameters parameters={prefillParams} />
      </SheetContent>
    </Sheet>
  );
}
