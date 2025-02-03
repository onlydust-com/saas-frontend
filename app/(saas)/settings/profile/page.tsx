"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { withAuthenticated } from "@/shared/providers/auth-provider";

function ProfilePage() {
  return <div>Profile</div>;
}

export default withClientOnly(withAuthenticated(ProfilePage));
