import { MeStoragePort } from "@/core/domain/me/outputs/me-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class MeClientAdapterMock implements MeStoragePort {
  constructor() {}

  routes = {};

  logoutMe = mockHttpStorageResponse<MeStoragePort["logoutMe"]>;

  getMe = mockHttpStorageResponse<MeStoragePort["getMe"]>;

  setMe = mockHttpStorageResponse<MeStoragePort["setMe"]>;

  getMyProfile = mockHttpStorageResponse<MeStoragePort["getMyProfile"]>;

  setMyProfile = mockHttpStorageResponse<MeStoragePort["setMyProfile"]>;

  replaceMyProfile = mockHttpStorageResponse<MeStoragePort["replaceMyProfile"]>;

  getMyProjectsAsMaintainer = mockHttpStorageResponse<MeStoragePort["getMyProjectsAsMaintainer"]>;

  getMyProjectsAsContributor = mockHttpStorageResponse<MeStoragePort["getMyProjectsAsContributor"]>;

  setMyPayoutPreferenceForProject = mockHttpStorageResponse<MeStoragePort["setMyPayoutPreferenceForProject"]>;
}
