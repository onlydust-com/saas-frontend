import { LegalFacadePort } from "@/core/kernel/legal/legal-facade-port";

export class LegalAdapterMock implements LegalFacadePort {
  getTermsAndConditionsUrl() {
    return "";
  }

  getPrivacyPolicyUrl() {
    return "";
  }
}
