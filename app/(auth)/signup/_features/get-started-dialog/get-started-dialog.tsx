"use client";

import step1 from "@/public/images/signup/slide-4.png";
import step2 from "@/public/images/signup/slide-5.png";
import step3 from "@/public/images/signup/slide-6.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocalStorage, useSessionStorage } from "react-use";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Button } from "@/shared/ui/button";
import { Card, CardFooter } from "@/shared/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { TypographyH2, TypographyH3, TypographyMuted } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

interface GetStartedDialogProps {
  defaultOpen?: boolean;
}

export function GetStartedDialog({ defaultOpen = true }: GetStartedDialogProps) {
  const [hideDialog, setHideDialog] = useLocalStorage("hide-get-started-dialog", false);
  const [hideForSession, setHideForSession] = useSessionStorage("hide-get-started-session", false);
  const [open, setOpen] = useState<boolean>(!hideDialog && !hideForSession && defaultOpen);
  const router = useRouter();

  // TODO waiting for endpoint to get the completed steps

  const steps = [
    {
      title: "Apply for your first issue",
      description: "Explore issues recommended based on your skills and interests",
      image: step1,
      route: NEXT_ROUTER.discover.root,
      completed: true,
    },
    {
      title: "Get assigned to an issue",
      description: "Apply for an issue and start your contribution journey",
      image: step2,
      route: NEXT_ROUTER.myDashboard.contributions.root,
      completed: true,
    },
    {
      title: "Complete your first contribution",
      description: "Contribute to projects and build your developer profile",
      image: step3,
      route: NEXT_ROUTER.myDashboard.projects.root,
      completed: false,
    },
  ];

  function handleCardClick(route: string) {
    setOpen(false);
    router.push(route);
  }

  function handleHideDialog() {
    setHideDialog(true);
    setOpen(false);
  }

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      setHideForSession(true);
    }
    setOpen(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[80%]">
        <DialogHeader>
          <DialogTitle>
            <TypographyH2>Get Started with Our Platform</TypographyH2>
          </DialogTitle>
          <DialogDescription>
            <TypographyMuted>Follow these steps to begin your open source contribution journey</TypographyMuted>
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card
              key={index}
              className={cn("relative flex aspect-square cursor-pointer overflow-hidden", {
                "pointer-events-none border-1 border-green-500": step.completed,
              })}
              onClick={() => handleCardClick(step.route)}
            >
              <Image src={step.image} alt={step.title} fill className="absolute inset-0 object-cover" />
              <CardFooter className="relative z-10 flex w-full flex-col items-start gap-1 self-end bg-secondary pt-6">
                <TypographyH3 className="line-clamp-1">{step.title}</TypographyH3>
                <TypographyMuted className="line-clamp-1">{step.description}</TypographyMuted>
              </CardFooter>
            </Card>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleHideDialog}>
            Hide this dialog permanently
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
