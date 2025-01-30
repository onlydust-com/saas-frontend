import { Project } from "@/core/domain/project/project.entity";

export interface ProjectCardProps {
  project: Project;
}

export const LANGUAGE_ICONS: Record<string, string> = {
  "Rust": "https://raw.githubusercontent.com/github/explore/master/topics/rust/rust.png",
  "Cairo": "https://raw.githubusercontent.com/starkware-libs/cairo/main/docs/cairo_logo.png",
  "TypeScript": "https://raw.githubusercontent.com/github/explore/master/topics/typescript/typescript.png",
  "JavaScript": "https://raw.githubusercontent.com/github/explore/master/topics/javascript/javascript.png",
  "Python": "https://raw.githubusercontent.com/github/explore/master/topics/python/python.png",
  "Move": "https://raw.githubusercontent.com/move-language/move/main/language/documentation/book/move-book-zh/images/move-logo.png",
  "Go": "https://raw.githubusercontent.com/github/explore/master/topics/go/go.png"
}; 