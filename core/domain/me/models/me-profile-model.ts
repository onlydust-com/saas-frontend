import { UserJoiningReason } from "@/core/domain/me/models/me.types";
import { UserProfileContact, UserProfileContactChannel } from "@/core/domain/user/models/user.types";
import { USER_PROFILE_JOINING_REASON } from "@/core/domain/user/user-constants";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type MeProfileResponse = components["schemas"]["PrivateUserProfileResponse"];

export interface MeProfileInterface extends MeProfileResponse {
  hasContact(channel: UserProfileContactChannel): boolean;
  getContact(channel: UserProfileContactChannel): UserProfileContact | undefined;
  getContactTelegram(): UserProfileContact | undefined;
  isMaintainer(): boolean;
  formatContact(channel: UserProfileContactChannel): UserProfileContact | undefined;
  getFormContactInfo(channel: UserProfileContactChannel): { contact: string; isPublic: boolean };
}

export class MeProfile implements MeProfileInterface {
  allocatedTimeToContribute!: MeProfileResponse["allocatedTimeToContribute"];
  avatarUrl!: MeProfileResponse["avatarUrl"];
  bio!: MeProfileResponse["bio"];
  contacts!: MeProfileResponse["contacts"];
  firstName!: MeProfileResponse["firstName"];
  githubUserId!: MeProfileResponse["githubUserId"];
  id!: MeProfileResponse["id"];
  isLookingForAJob!: MeProfileResponse["isLookingForAJob"];
  joiningReason!: MeProfileResponse["joiningReason"];
  lastName!: MeProfileResponse["lastName"];
  location!: MeProfileResponse["location"];
  login!: MeProfileResponse["login"];
  website!: MeProfileResponse["website"];

  constructor(props: MeProfileResponse) {
    Object.assign(this, props);
  }

  hasContact(channel: UserProfileContactChannel) {
    return this.contacts?.some(c => c.channel === channel && c.contact) ?? false;
  }

  getContact(channel: UserProfileContactChannel) {
    return this.contacts?.find(c => c.channel === channel && c.contact);
  }

  getContactTelegram() {
    return this.getContact(UserProfileContactChannel.telegram);
  }

  static sanitizeChannelContact(contact: string) {
    let sanitizedContact = contact;

    if (contact.endsWith("/")) {
      sanitizedContact = sanitizedContact.slice(0, -1);
    }

    if (contact.includes("/")) {
      sanitizedContact = sanitizedContact.split("/").at(-1) ?? "";
    }

    if (contact.startsWith("@")) {
      sanitizedContact = sanitizedContact.substring(1);
    }

    return sanitizedContact;
  }

  static buildContact({
    channel,
    contact,
    visibility = "private",
  }: {
    channel: UserProfileContactChannel;
    contact: string;
    visibility?: "public" | "private";
  }) {
    return { channel, contact: this.sanitizeChannelContact(contact), visibility };
  }

  static isValidJoiningReason(joiningReason?: string): joiningReason is UserJoiningReason {
    return (
      joiningReason === USER_PROFILE_JOINING_REASON.CONTRIBUTOR ||
      joiningReason === USER_PROFILE_JOINING_REASON.MAINTAINER ||
      joiningReason === USER_PROFILE_JOINING_REASON.SPONSOR
    );
  }

  isMaintainer() {
    return this.joiningReason === USER_PROFILE_JOINING_REASON.MAINTAINER;
  }

  formatContact(channel: UserProfileContactChannel) {
    const contact = this.getContact(channel);

    return contact
      ? {
          ...contact,
          contact: contact.contact ? MeProfile.sanitizeChannelContact(contact.contact) : undefined,
        }
      : undefined;
  }

  getFormContactInfo(channel: UserProfileContactChannel) {
    const contact = this.formatContact(channel);

    return {
      contact: contact?.contact ?? "",
      isPublic: contact?.visibility === "public",
    };
  }
}
