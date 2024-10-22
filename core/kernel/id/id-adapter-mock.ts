import { IdFacadePort } from "@/core/kernel/id/id-facade-port";

export const IdAdapterMock: IdFacadePort = {
  prettyId: (_id: string) => "#92F4E",
};
