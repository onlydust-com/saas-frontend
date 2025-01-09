import { bootstrap } from "@/core/bootstrap";

import "./markdown.css";
import { MarkdownProps } from "./markdown.types";

export function Markdown({ content }: MarkdownProps) {
  const markdownKernelPort = bootstrap.getMarkdownKernelPort();
  const md = markdownKernelPort.format({ content });

  return <div className="markdown-body" dangerouslySetInnerHTML={{ __html: md }} />;
}
