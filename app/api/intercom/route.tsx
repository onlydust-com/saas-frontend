import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { MARKETPLACE_API_BASE_URL } from "@/core/infrastructure/marketplace-api-client-adapter/config/base-url";

const { createHmac } = await import("node:crypto");

export async function GET() {
  const headersList = headers();
  const token = headersList.get("authorization");
  const impersonationHeaders = headersList.get("X-Impersonation-Claims") ?? undefined;

  if (!token || impersonationHeaders) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await fetch(`${MARKETPLACE_API_BASE_URL}/api/v1/me`, {
    headers: {
      Authorization: token,
    },
  })
    .then(res => res.json())
    .catch(() => {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    });

  if (user) {
    const secretKey = process.env.INTERCOM_SECRET_KEY ?? "";

    if (secretKey) {
      const userIdentifier = user.id;
      const hash = createHmac("sha256", secretKey).update(userIdentifier).digest("hex");

      return NextResponse.json({ hash }, { status: 201 });
    }
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
