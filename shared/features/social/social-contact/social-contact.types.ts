import { Contact } from "@/core/kernel/social/social.types";
import { AnyType } from "@/core/kernel/types";

import { ButtonPort } from "@/design-system/atoms/button/button.types";

export interface SocialContactProps {
  contact: Contact;
  buttonProps?: ButtonPort<AnyType>;
}
