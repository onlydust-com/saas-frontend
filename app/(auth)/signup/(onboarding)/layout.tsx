"use client";

import { PropsWithChildren } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { TypographyMuted } from "@/shared/ui/typography";

export default function OnboardingLayout({ children }: PropsWithChildren) {
  // TODO matchpath for terms and conditions, global info, personalize

  return (
    <div className={"flex w-full max-w-2xl flex-col gap-6"}>
      <Card className="overflow-hidden">
        <CardHeader className="border-b-1 p-6 pb-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>Signup</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Terms & Conditions</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <TypographyMuted className="pt-2">
            You must read and accept the Terms & Conditions to access the app.
          </TypographyMuted>
        </CardHeader>

        <CardContent className="pt-4">{children}</CardContent>
      </Card>
    </div>
  );
}
