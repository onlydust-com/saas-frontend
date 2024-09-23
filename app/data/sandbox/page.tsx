"use client";

import { useState } from "react";

import { LeadProject } from "@/shared/features/filters/lead-project/lead-project";

export default function SandboxPage() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  return (
    <div className={"flex h-full w-full items-start justify-center"}>
      <div className={"h-full w-[384px] bg-background-primary-alt"}>
        <LeadProject selectedUser={selectedUsers} onSelect={setSelectedUsers} />
      </div>
    </div>
  );
}
