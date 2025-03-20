"use client";

import step1 from "@/public/images/signup/slide-1.png";
import step2 from "@/public/images/signup/slide-2.png";
import step3 from "@/public/images/signup/slide-3.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/shared/ui/button";
import { Card, CardFooter } from "@/shared/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { TypographyH2, TypographyH3, TypographyMuted } from "@/shared/ui/typography";

interface GetStartedDialogProps {
  trigger?: React.ReactNode;
  defaultOpen?: boolean;
}

export function GetStartedDialog({ trigger, defaultOpen = false }: GetStartedDialogProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const router = useRouter();

  const steps = [
    {
      title: "Find Your First Issue",
      description: "Explore issues recommended based on your skills and interests",
      image: step1,
      route: "/dashboard/issues",
    },
    {
      title: "Get Assigned",
      description: "Apply for an issue and start your contribution journey",
      image: step2,
      route: "/dashboard/assignments",
    },
    {
      title: "Unlock Your Skills",
      description: "Contribute to projects and build your developer profile",
      image: step3,
      route: "/dashboard/profile",
    },
  ];

  const handleCardClick = (route: string) => {
    setOpen(false);
    router.push(route);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button variant="default">Get Started</Button>
        </DialogTrigger>
      )}
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
              className="relative flex aspect-square overflow-hidden"
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
      </DialogContent>
    </Dialog>
  );
}
