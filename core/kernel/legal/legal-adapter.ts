import { LegalFacadePort } from "@/core/kernel/legal/legal-facade-port";

export class LegalAdapter implements LegalFacadePort {
  private constructUrl(filename: string): string {
    const bucket = process.env.NEXT_PUBLIC_LEGALS_S3_BUCKET;

    if (!bucket) {
      throw new Error("NEXT_PUBLIC_LEGALS_S3_BUCKET environment variable is not set");
    }

    const url = `${bucket}/${filename}`;

    try {
      new URL(url);
      return url;
    } catch (e) {
      throw new Error(`Invalid URL constructed: ${url}`);
    }
  }

  private urls = {
    terms: this.constructUrl("terms-and-conditions.pdf"),
    privacy: this.constructUrl("privacy-policy.pdf"),
  };

  getTermsAndConditionsUrl() {
    return this.urls.terms;
  }

  getPrivacyPolicyUrl() {
    return this.urls.privacy;
  }
}
