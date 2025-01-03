import markdownit from "markdown-it";

import { MarkdownFacadePort } from "./markdown-facade-port";

export class MarkdownAdapter implements MarkdownFacadePort {
  md: markdownit;

  constructor() {
    this.md = markdownit();
  }

  format({ content }: { content: string }) {
    return this.md.render(content);
  }
}
