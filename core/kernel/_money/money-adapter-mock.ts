import { MoneyFacadePort } from "./money-facade-port";

export class MoneyAdapterMock implements MoneyFacadePort {
  isFiat() {
    return false;
  }
}
