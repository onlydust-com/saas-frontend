import MDEditor, { commands } from "@uiw/react-md-editor";
import * as React from "react";

import "./markdown-editor.css";
import { MarkdownEditorProps } from "./markdown-editor.types";

export const MarkdownEditor = React.forwardRef<HTMLTextAreaElement, MarkdownEditorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <MDEditor
          ref={ref}
          value={props.value as string}
          onChange={(_, event) => (event ? props.onChange?.(event) : undefined)}
          preview="edit"
          height={350}
          commands={[
            commands.bold,
            commands.italic,
            commands.strikethrough,
            commands.divider,
            commands.link,
            commands.orderedListCommand,
            commands.unorderedListCommand,
            commands.divider,
            commands.table,
            commands.codeBlock,
            commands.code,
            commands.quote,
          ]}
          extraCommands={[commands.fullscreen]}
        />
      </div>
    );
  }
);
