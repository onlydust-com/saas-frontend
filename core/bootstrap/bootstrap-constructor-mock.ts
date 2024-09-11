import { BootstrapConstructor } from "@/core/bootstrap/index";
import { BannerClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/banner-client-adapter-mock";
import { CurrencyClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/currency-client-adapter-mock";
import { ProgramClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/program-client-adapter-mock";
import { ProjectClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/project-client-adapter-mock";
import { SponsorClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/sponsor-client-adapter-mock";
import { UserClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/user-client-adapter-mock";
import { DateAdapterMock } from "@/core/kernel/date/date-adapter-mock";
import { FileAdapterMock } from "@/core/kernel/file/file-adapter-mock";
import { MoneyAdapterMock } from "@/core/kernel/money/money-adapter-mock";
import { UrlAdapterMock } from "@/core/kernel/url/url-adapter-mock";

export const bootstrapConstructorMock: BootstrapConstructor = {
  userStoragePortForClient: new UserClientAdapterMock(),
  userStoragePortForServer: new UserClientAdapterMock(),
  bannerStoragePortForClient: new BannerClientAdapterMock(),
  bannerStoragePortForServer: new BannerClientAdapterMock(),
  programStoragePortForClient: new ProgramClientAdapterMock(),
  programStoragePortForServer: new ProgramClientAdapterMock(),
  projectStoragePortForClient: new ProjectClientAdapterMock(),
  projectStoragePortForServer: new ProjectClientAdapterMock(),
  sponsorStoragePortForClient: new SponsorClientAdapterMock(),
  sponsorStoragePortForServer: new SponsorClientAdapterMock(),
  currencyStoragePortForClient: new CurrencyClientAdapterMock(),
  currencyStoragePortForServer: new CurrencyClientAdapterMock(),
  dateKernelPort: DateAdapterMock,
  moneyKernelPort: new MoneyAdapterMock(),
  fileKernelPort: new FileAdapterMock(),
  urlKernelPort: UrlAdapterMock,
};
