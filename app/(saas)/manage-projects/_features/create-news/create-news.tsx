import { FilloutStandardEmbed } from "@fillout/react";
import { useState } from "react";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";

import { CreateNewsProps } from "./create-news.types";

const filloutId = process.env.NEXT_PUBLIC_OD_NEWS_FORM_ID ?? "";

export function CreateNews({ projectId, children }: CreateNewsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthUser();

  const prefillParams = {
    projectId: projectId,
    githubUserId: user?.githubUserId?.toString(),
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
