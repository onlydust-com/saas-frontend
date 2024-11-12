import { BootstrapConstructor } from "@/core/bootstrap/index";
import { ApplicationClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/application-client-adapter-mock";
import { BannerClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/banner-client-adapter-mock";
import { BiClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/bi-client-adapter-mock";
import { ContributionClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/contribution-client-adapter-mock";
import { CountryClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/country-client-adapter-mock";
import { CurrencyClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/currency-client-adapter-mock";
import { DepositClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/deposit-client-adapter-mock";
import { EcosystemClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/ecosystem-client-adapter-mock";
import { GithubClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/github-client-adapter-mock";
import { IssueClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/issue-client-adapter-mock";
import { LanguagesClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/languages-client-adapter-mock";
import { MeClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/me-client-adapter-mock";
import { NotificationClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/notification-client-adapter-mock";
import { ProgramClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/program-client-adapter-mock";
import { ProjectCategoryClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/project-category-client-adapter-mock";
import { ProjectClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/project-client-adapter-mock";
import { RewardClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/reward-client-adapter-mock";
import { SponsorClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/sponsor-client-adapter-mock";
import { UserClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/user-client-adapter-mock";
import { DateAdapterMock } from "@/core/kernel/date/date-adapter-mock";
import { FileAdapterMock } from "@/core/kernel/file/file-adapter-mock";
import { IdAdapterMock } from "@/core/kernel/id/id-adapter-mock";
import { MoneyAdapterMock } from "@/core/kernel/money/money-adapter-mock";
import { StyleAdapterMock } from "@/core/kernel/style/style-adapter-mock";
import { UrlAdapterMock } from "@/core/kernel/url/url-adapter-mock";
import { ValidationAdapterMock } from "@/core/kernel/validation/validation-adapter-mock";

export const bootstrapConstructorMock: BootstrapConstructor = {
  meStoragePortForClient: new MeClientAdapterMock(),
  meStoragePortForServer: new MeClientAdapterMock(),
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
  biStoragePortForClient: new BiClientAdapterMock(),
  biStoragePortForServer: new BiClientAdapterMock(),
  currencyStoragePortForClient: new CurrencyClientAdapterMock(),
  currencyStoragePortForServer: new CurrencyClientAdapterMock(),
  depositStoragePortForClient: new DepositClientAdapterMock(),
  depositStoragePortForServer: new DepositClientAdapterMock(),
  notificationStoragePortForClient: new NotificationClientAdapterMock(),
  notificationStoragePortForServer: new NotificationClientAdapterMock(),
  projectCategoryStoragePortForClient: new ProjectCategoryClientAdapterMock(),
  projectCategoryStoragePortForServer: new ProjectCategoryClientAdapterMock(),
  languageStoragePortForClient: new LanguagesClientAdapterMock(),
  languageStoragePortForServer: new LanguagesClientAdapterMock(),
  countryStoragePortForClient: new CountryClientAdapterMock(),
  countryStoragePortForServer: new CountryClientAdapterMock(),
  ecosystemStoragePortForServer: new EcosystemClientAdapterMock(),
  ecosystemStoragePortForClient: new EcosystemClientAdapterMock(),
  githubStoragePortForServer: new GithubClientAdapterMock(),
  githubStoragePortForClient: new GithubClientAdapterMock(),
  contributionStoragePortForServer: new ContributionClientAdapterMock(),
  contributionStoragePortForClient: new ContributionClientAdapterMock(),
  applicationStoragePortForClient: new ApplicationClientAdapterMock(),
  applicationStoragePortForServer: new ApplicationClientAdapterMock(),
  rewardStoragePortForClient: new RewardClientAdapterMock(),
  rewardStoragePortForServer: new RewardClientAdapterMock(),
  issueStoragePortForClient: new IssueClientAdapterMock(),
  issueStoragePortForServer: new IssueClientAdapterMock(),
  dateKernelPort: DateAdapterMock,
  moneyKernelPort: new MoneyAdapterMock(),
  fileKernelPort: new FileAdapterMock(),
  urlKernelPort: UrlAdapterMock,
  idKernelPort: IdAdapterMock,
  validationKernelPort: new ValidationAdapterMock(),
  styleKernelPort: StyleAdapterMock,
};
