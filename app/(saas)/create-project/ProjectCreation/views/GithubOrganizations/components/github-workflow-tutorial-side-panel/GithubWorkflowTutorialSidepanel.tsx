import { PropsWithChildren, useState } from "react";

import { Button } from "@/shared/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";

import TutorialSidePanelHelp from "./components/Help";
import TutorialSidePanelSteps1 from "./components/Steps1";
import TutorialSidePanelSteps2 from "./components/Steps2";
import TutorialSidePanelSteps3 from "./components/Steps3";

export const GithubWorkflowTutorialSidepanel = ({ children }: PropsWithChildren) => {
  const [open, setIsOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="px-0">
        <div className="flex h-full flex-col justify-between">
          <div className="flex h-full flex-col px-4 pb-8">
            <div className="font-belwe text-greyscale-50 mb-8 px-2 text-2xl font-normal">How to grant permissions</div>
            <div className="px-2">
              <div className="text-body-m text-greyscale-50 pb-2 font-normal">
                You are required to grant permissions to all organizations where you want to install the OnlyDust Github
                app.
              </div>
            </div>
            <div className="bg-card-border-medium my-6 h-[1px] w-full" />
            <div className="scrollbar-sm flex flex-1 flex-col gap-6 overflow-auto px-2 pb-24">
              <TutorialSidePanelSteps1 />
              <TutorialSidePanelSteps2 />
              <TutorialSidePanelSteps3 />
              <TutorialSidePanelHelp onClose={() => setIsOpen(false)} />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-background">
            <div className="border-card-border-light bg-card-background-light flex h-auto w-full items-center justify-end gap-5 border-t px-8 py-6">
              <Button onClick={() => setIsOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
