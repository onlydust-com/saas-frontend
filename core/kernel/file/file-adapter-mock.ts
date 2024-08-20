import { FileFacadePort } from "./file-facade-port";

export class FileAdapterMock implements FileFacadePort {
  download() {
    return Promise.resolve();
  }
}
