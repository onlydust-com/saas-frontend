import { BannerStoragePort } from "@/core/domain/banner/outputs/banner-storage-port";
import { ProgramStoragePort } from "@/core/domain/program/outputs/program-storage-port";
import { ProjectStoragePort } from "@/core/domain/project/outputs/project-storage-port";
import { SponsorStoragePort } from "@/core/domain/sponsor/outputs/sponsor-storage-port";
import { UserStoragePort } from "@/core/domain/user/outputs/user-storage-port";
import { BannerClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/banner-client-adapter";
import { ProgramClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/program-client-adapter";
import { ProjectClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/project-client-adapter";
import { SponsorClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/sponsor-client-adapter";
import { UserClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/user-client-adapter";
import { AuthProvider } from "@/core/infrastructure/marketplace-api-client-adapter/auth/auth-provider";
import { FetchHttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/fetch-http-client/fetch-http-client";
import { ImpersonationProvider } from "@/core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation-provider";
import { DateFacadePort } from "@/core/kernel/date/date-facade-port";
import { DateFnsAdapter } from "@/core/kernel/date/date-fns-adapter";
import { MoneyAdapter } from "@/core/kernel/money/money-adapter";
import { MoneyFacadePort } from "@/core/kernel/money/money-facade-port";
import { UrlAdapter } from "@/core/kernel/url/url-adapter";
import { UrlFacadePort } from "@/core/kernel/url/url-facade-port";

import { FileAdapter } from "../kernel/file/file-adapter";
import { FileFacadePort } from "../kernel/file/file-facade-port";

export interface BootstrapConstructor {
  userStoragePortForClient: UserStoragePort;
  userStoragePortForServer: UserStoragePort;
  bannerStoragePortForClient: BannerStoragePort;
  bannerStoragePortForServer: BannerStoragePort;
  programStoragePortForClient: ProgramStoragePort;
  programStoragePortForServer: ProgramStoragePort;
  projectStoragePortForClient: ProjectStoragePort;
  projectStoragePortForServer: ProjectStoragePort;
  sponsorStoragePortForClient: SponsorStoragePort;
  sponsorStoragePortForServer: SponsorStoragePort;
  dateKernelPort: DateFacadePort;
  moneyKernelPort: MoneyFacadePort;
  fileKernelPort: FileFacadePort;
  urlKernelPort: UrlFacadePort;
}

export class Bootstrap {
  static #instance: Bootstrap;
  private authProvider?: AuthProvider;
  private impersonationProvider?: ImpersonationProvider | null = null;
  userStoragePortForClient: UserStoragePort;
  userStoragePortForServer: UserStoragePort;
  bannerStoragePortForClient: BannerStoragePort;
  bannerStoragePortForServer: BannerStoragePort;
  programStoragePortForClient: ProgramStoragePort;
  programStoragePortForServer: ProgramStoragePort;
  projectStoragePortForClient: ProjectStoragePort;
  projectStoragePortForServer: ProjectStoragePort;
  sponsorStoragePortForClient: SponsorStoragePort;
  sponsorStoragePortForServer: SponsorStoragePort;
  dateKernelPort: DateFacadePort;
  moneyKernelPort: MoneyFacadePort;
  fileKernelPort: FileFacadePort;
  urlKernelPort: UrlFacadePort;

  constructor(constructor: BootstrapConstructor) {
    this.userStoragePortForClient = constructor.userStoragePortForClient;
    this.userStoragePortForServer = constructor.userStoragePortForServer;
    this.bannerStoragePortForClient = constructor.bannerStoragePortForClient;
    this.bannerStoragePortForServer = constructor.bannerStoragePortForServer;
    this.programStoragePortForClient = constructor.programStoragePortForClient;
    this.programStoragePortForServer = constructor.programStoragePortForServer;
    this.projectStoragePortForClient = constructor.projectStoragePortForClient;
    this.projectStoragePortForServer = constructor.projectStoragePortForServer;
    this.sponsorStoragePortForClient = constructor.sponsorStoragePortForClient;
    this.sponsorStoragePortForServer = constructor.sponsorStoragePortForServer;
    this.dateKernelPort = constructor.dateKernelPort;
    this.moneyKernelPort = constructor.moneyKernelPort;
    this.fileKernelPort = constructor.fileKernelPort;
    this.urlKernelPort = constructor.urlKernelPort;
  }

  getAuthProvider() {
    return this.authProvider;
  }

  setAuthProvider(authProvider: AuthProvider) {
    this.authProvider = authProvider;
  }

  getImpersonationProvider() {
    return this.impersonationProvider;
  }

  setImpersonationProvider(impersonationProvider: ImpersonationProvider) {
    this.impersonationProvider = impersonationProvider;
  }

  getUserStoragePortForClient() {
    return this.userStoragePortForClient;
  }

  getUserStoragePortForServer() {
    return this.userStoragePortForServer;
  }

  getBannerStoragePortForClient() {
    return this.bannerStoragePortForClient;
  }

  getBannerStoragePortForServer() {
    return this.bannerStoragePortForServer;
  }

  getProgramStoragePortForClient() {
    return this.programStoragePortForClient;
  }

  getProgramStoragePortForServer() {
    return this.programStoragePortForServer;
  }

  getProjectStoragePortForClient() {
    return this.projectStoragePortForClient;
  }

  getProjectStoragePortForServer() {
    return this.projectStoragePortForServer;
  }

  getSponsorStoragePortForClient() {
    return this.sponsorStoragePortForClient;
  }

  getSponsorStoragePortForServer() {
    return this.sponsorStoragePortForServer;
  }

  getDateKernelPort() {
    return this.dateKernelPort;
  }

  getMoneyKernelPort() {
    return this.moneyKernelPort;
  }

  getFileKernelPort() {
    return this.fileKernelPort;
  }

  getUrlKernelPort() {
    return this.urlKernelPort;
  }

  public static get getBootstrap(): Bootstrap {
    if (!Bootstrap.#instance) {
      this.newBootstrap({
        userStoragePortForClient: new UserClientAdapter(new FetchHttpClient()),
        userStoragePortForServer: new UserClientAdapter(new FetchHttpClient()),
        bannerStoragePortForClient: new BannerClientAdapter(new FetchHttpClient()),
        bannerStoragePortForServer: new BannerClientAdapter(new FetchHttpClient()),
        programStoragePortForClient: new ProgramClientAdapter(new FetchHttpClient()),
        programStoragePortForServer: new ProgramClientAdapter(new FetchHttpClient()),
        projectStoragePortForClient: new ProjectClientAdapter(new FetchHttpClient()),
        projectStoragePortForServer: new ProjectClientAdapter(new FetchHttpClient()),
        sponsorStoragePortForClient: new SponsorClientAdapter(new FetchHttpClient()),
        sponsorStoragePortForServer: new SponsorClientAdapter(new FetchHttpClient()),
        dateKernelPort: DateFnsAdapter,
        moneyKernelPort: new MoneyAdapter(),
        fileKernelPort: new FileAdapter(),
        urlKernelPort: UrlAdapter,
      });
    }

    return Bootstrap.#instance;
  }

  public static newBootstrap(constructor: BootstrapConstructor): Bootstrap {
    Bootstrap.#instance = new Bootstrap(constructor);
    return Bootstrap.#instance;
  }
}

export const bootstrap = Bootstrap.getBootstrap;
