"use client";

import { useState } from "react";

import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";

import { InviteCoworkerProps } from "./invite-coworker.types";

export function InviteCoworker({ id }: InviteCoworkerProps) {
  const [role, setRole] = useState<"admin" | "member">("member");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Invite team member</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Invite team member</SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          <RadioGroup value={role} onValueChange={value => setRole(value as "admin" | "member")}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="admin" id="admin" />
              <Label htmlFor="admin">Admin</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="member" id="member" />
              <Label htmlFor="member">Member</Label>
            </div>
          </RadioGroup>
        </div>
      </SheetContent>
    </Sheet>
  );
}
