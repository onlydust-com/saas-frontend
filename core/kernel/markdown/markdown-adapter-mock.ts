import { MarkdownFacadePort } from "./markdown-facade-port";

export class MarkdownAdapterMock implements MarkdownFacadePort {
  format() {
    return "";
  }
}
