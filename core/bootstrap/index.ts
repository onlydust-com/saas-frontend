import { BannerStoragePort } from "@/core/domain/banner/outputs/banner-storage-port";
import { ProgramStoragePort } from "@/core/domain/program/outputs/program-storage-port";
import { ProjectStoragePort } from "@/core/domain/project/outputs/project-storage-port";
import { UserStoragePort } from "@/core/domain/user/outputs/user-storage-port";
import { BannerClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/banner-client-adapter";
import { ProgramClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/program-client-adapter";
import { ProjectClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/project-client-adapter";
import { UserClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/user-client-adapter";
import { AuthProvider } from "@/core/infrastructure/marketplace-api-client-adapter/auth/auth-provider";
import { FetchHttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/fetch-http-client/fetch-http-client";
import { ImpersonationProvider } from "@/core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation-provider";
import { DateFacadePort } from "@/core/kernel/date/date-facade-port";
import { DateFnsAdapter } from "@/core/kernel/date/date-fns-adapter";
import { MoneyAdapter } from "@/core/kernel/money/money-adapter";
import { MoneyFacadePort } from "@/core/kernel/money/money-facade-port";

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
  dateKernelPort: DateFacadePort;
  moneyKernelPort: MoneyFacadePort;
  fileKernelPort: FileFacadePort;
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
  dateKernelPort: DateFacadePort;
  moneyKernelPort: MoneyFacadePort;
  fileKernelPort: FileFacadePort;

  constructor(constructor: BootstrapConstructor) {
    this.userStoragePortForClient = constructor.userStoragePortForClient;
    this.userStoragePortForServer = constructor.userStoragePortForServer;
    this.bannerStoragePortForClient = constructor.bannerStoragePortForClient;
    this.bannerStoragePortForServer = constructor.bannerStoragePortForServer;
    this.programStoragePortForClient = constructor.programStoragePortForClient;
    this.programStoragePortForServer = constructor.programStoragePortForServer;
    this.projectStoragePortForClient = constructor.projectStoragePortForClient;
    this.projectStoragePortForServer = constructor.projectStoragePortForServer;
    this.dateKernelPort = constructor.dateKernelPort;
    this.moneyKernelPort = constructor.moneyKernelPort;
    this.fileKernelPort = constructor.fileKernelPort;
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

  getDateKernelPort() {
    return this.dateKernelPort;
  }

  getMoneyKernelPort() {
    return this.moneyKernelPort;
  }

  getFileKernelPort() {
    return this.fileKernelPort;
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
        dateKernelPort: DateFnsAdapter,
        moneyKernelPort: new MoneyAdapter(),
        fileKernelPort: new FileAdapter(),
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
