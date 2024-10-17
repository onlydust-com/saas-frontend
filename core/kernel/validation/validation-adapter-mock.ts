import { ValidationFacadePort } from "@/core/kernel/validation/validation-facade-port";

export class ValidationAdapterMock implements ValidationFacadePort {
  isNullable(_value: unknown) {
    return false;
  }

  isEmptyString(_value: unknown) {
    return false;
  }

  isInvalidNumber(_value: unknown) {
    return false;
  }

  isEmptyArray(_value: unknown) {
    return false;
  }

  isInvalidValue(_value: unknown) {
    return false;
  }
}
