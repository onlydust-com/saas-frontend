import { UserStoragePort } from "@/core/domain/user/outputs/user-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class UserClientAdapterMock implements UserStoragePort {
  constructor() {}

  routes = {};

  searchUser = mockHttpStorageResponse<UserStoragePort["searchUser"]>;

  getUserByLogin = mockHttpStorageResponse<UserStoragePort["getUserByLogin"]>;

  getUserById = mockHttpStorageResponse<UserStoragePort["getUserById"]>;

  getUserLanguages = mockHttpStorageResponse<UserStoragePort["getUserLanguages"]>;

  getUserEcosystems = mockHttpStorageResponse<UserStoragePort["getUserEcosystems"]>;

  getUserStats = mockHttpStorageResponse<UserStoragePort["getUserStats"]>;
}
