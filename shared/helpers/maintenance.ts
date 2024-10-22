import { bootstrap } from "@/core/bootstrap";

export function isInMaintenanceMode() {
  const envVar = process.env.NEXT_PUBLIC_MAINTENANCE ?? ""; // Should be a UTC datetime string ex: 2024-04-10T15:00:00Z
  const endsAt = new Date(envVar);
  const dateKernelPort = bootstrap.getDateKernelPort();
  const isDateValid = dateKernelPort.isValid(endsAt);

  return {
    inMaintenance: isDateValid,
    endsAt: isDateValid ? endsAt : undefined,
  };
}
