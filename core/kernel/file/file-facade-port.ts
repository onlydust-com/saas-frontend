export interface FileFacadePort {
  download({ blob, name, extension }: { blob: Blob; name: string; extension: string }): void;
}
