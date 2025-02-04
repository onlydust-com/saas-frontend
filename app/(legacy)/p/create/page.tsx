"use client";

import { ProjectCreation } from "@/app/(legacy)/p/create/_features/ProjectCreation/ProjectCreation";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { withAuthenticated } from "@/shared/providers/auth-provider";

function CreatePage() {
  return <ProjectCreation />;
}

export default withClientOnly(withAuthenticated(CreatePage));
