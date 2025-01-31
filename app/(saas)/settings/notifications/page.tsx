"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { withAuthenticated } from "@/shared/providers/auth-provider";

function NotificationsPage() {
  return <div>Notifications</div>;
}

export default withClientOnly(withAuthenticated(NotificationsPage));
