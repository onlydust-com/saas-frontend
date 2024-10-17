import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ContributionItemBody = components["schemas"]["RewardItemRequest"];

export interface ContributionItemDtoInterface extends ContributionItemBody {
  isEqualTo(other: ContributionItemDtoInterface): boolean;
  githubId: number;
  toBody(): ContributionItemBody;
}

export class ContributionItemDto implements ContributionItemDtoInterface {
  type!: ContributionItemBody["type"];
  id!: ContributionItemBody["id"];
  githubId!: number;
  number!: ContributionItemBody["number"];
  repoId!: ContributionItemBody["repoId"];

  constructor(props: ContributionItemBody & { githubId: number }) {
    Object.assign(this, props);
  }

  isEqualTo(other: ContributionItemDtoInterface): boolean {
    const isSameType = this.type === other.type;
    const isSameId = this.id === other.id;
    const isSameNumber = this.number === other.number;

    return isSameType && isSameId && isSameNumber;
  }

  toBody(): ContributionItemBody {
    return {
      type: this.type,
      id: this.id,
      number: this.number,
      repoId: this.repoId,
    };
  }
}
