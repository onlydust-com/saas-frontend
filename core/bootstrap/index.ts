import { BannerStoragePort } from "@/core/domain/banner/outputs/banner-storage-port";
import { UserStoragePort } from "@/core/domain/user/outputs/user-storage-port";
import { BannerClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/banner-client-adapter";
import { UserClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/user-client-adapter";
import { AuthProvider } from "@/core/infrastructure/marketplace-api-client-adapter/auth/auth-provider";
import { FetchHttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/fetch-http-client/fetch-http-client";
import { ImpersonationProvider } from "@/core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation-provider";
import { DateFacadePort } from "@/core/kernel/date/date-facade-port";
import { DateFnsAdapter } from "@/core/kernel/date/date-fns-adapter";

export interface BootstrapConstructor {
  userStoragePortForClient: UserStoragePort;
  userStoragePortForServer: UserStoragePort;
  bannerStoragePortForClient: BannerStoragePort;
  bannerStoragePortForServer: BannerStoragePort;
  dateKernelPort: DateFacadePort;
}

export class Bootstrap {
  static #instance: Bootstrap;
  private authProvider?: AuthProvider;
  private impersonationProvider?: ImpersonationProvider | null = null;
  userStoragePortForClient: UserStoragePort;
  userStoragePortForServer: UserStoragePort;
  bannerStoragePortForClient: BannerStoragePort;
  bannerStoragePortForServer: BannerStoragePort;
  dateKernelPort: DateFacadePort;

  constructor(constructor: BootstrapConstructor) {
    this.userStoragePortForClient = constructor.userStoragePortForClient;
    this.userStoragePortForServer = constructor.userStoragePortForServer;
    this.bannerStoragePortForClient = constructor.bannerStoragePortForClient;
    this.bannerStoragePortForServer = constructor.bannerStoragePortForServer;
    this.dateKernelPort = constructor.dateKernelPort;
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

  setImpersonationProvider(impersonationProvider: ImpersonationProvider | null) {
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

  getDateKernelPort() {
    return this.dateKernelPort;
  }

  public static get getBootstrap(): Bootstrap {
    if (!Bootstrap.#instance) {
      this.newBootstrap({
        userStoragePortForClient: new UserClientAdapter(new FetchHttpClient()),
        userStoragePortForServer: new UserClientAdapter(new FetchHttpClient()),
        bannerStoragePortForClient: new BannerClientAdapter(new FetchHttpClient()),
        bannerStoragePortForServer: new BannerClientAdapter(new FetchHttpClient()),
        dateKernelPort: DateFnsAdapter,
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
