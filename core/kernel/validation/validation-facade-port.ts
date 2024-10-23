export interface ValidationFacadePort {
  isNullable(value: unknown): boolean;
  isEmptyString(value: unknown): boolean;
  isInvalidNumber(value: unknown): boolean;
  isEmptyArray(value: unknown): boolean;
  isInvalidValue(value: unknown): boolean;
}
