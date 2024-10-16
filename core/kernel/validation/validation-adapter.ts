import { ValidationFacadePort } from "./validation-facade-port";

export class ValidationAdapter implements ValidationFacadePort {
  isNullable(value: unknown) {
    return value === null || value === undefined;
  }

  isEmptyString(value: unknown) {
    return typeof value === "string" && value.trim() === "";
  }

  isInvalidNumber(value: unknown) {
    return typeof value === "number" && isNaN(value);
  }

  isEmptyArray(value: unknown) {
    return Array.isArray(value) && value.length === 0;
  }
}
