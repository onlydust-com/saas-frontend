import { UserStoragePort } from "@/core/domain/user/outputs/user-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class UserClientAdapterMock implements UserStoragePort {
  constructor() {}

  routes = {};

  getMe = mockHttpStorageResponse<UserStoragePort["getMe"]>;

  setMe = mockHttpStorageResponse<UserStoragePort["setMe"]>;

  getMyProfile = mockHttpStorageResponse<UserStoragePort["getMyProfile"]>;

  setMyProfile = mockHttpStorageResponse<UserStoragePort["setMyProfile"]>;

  replaceMyProfile = mockHttpStorageResponse<UserStoragePort["replaceMyProfile"]>;
}
