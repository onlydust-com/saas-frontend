import { BootstrapConstructor } from "@/core/bootstrap/index";
import { BannerClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/banner-client-adapter-mock";
import { ProgramClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/program-client-adapter-mock";
import { UserClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/user-client-adapter-mock";
import { DateAdapterMock } from "@/core/kernel/date/date-adapter-mock";
import { MoneyAdapterMock } from "@/core/kernel/money/money-adapter-mock";

export const bootstrapConstructorMock: BootstrapConstructor = {
  userStoragePortForClient: new UserClientAdapterMock(),
  userStoragePortForServer: new UserClientAdapterMock(),
  bannerStoragePortForClient: new BannerClientAdapterMock(),
  bannerStoragePortForServer: new BannerClientAdapterMock(),
  programStoragePortForClient: new ProgramClientAdapterMock(),
  programStoragePortForServer: new ProgramClientAdapterMock(),
  dateKernelPort: DateAdapterMock,
  moneyKernelPort: MoneyAdapterMock,
};
