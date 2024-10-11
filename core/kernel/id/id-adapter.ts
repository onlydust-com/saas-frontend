import { IdFacadePort } from "@/core/kernel/id/id-facade-port";

export const IdAdapter: IdFacadePort = {
  prettyId: (id: string): string => id?.substring(0, 5).toLocaleUpperCase() ?? "",
};
