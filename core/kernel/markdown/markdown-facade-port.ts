export interface MarkdownFacadePort {
  format({ content }: { content: string }): string;
}
