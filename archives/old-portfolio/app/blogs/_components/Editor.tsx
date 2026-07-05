import React from "react";

import { BlockNoteView } from "@blocknote/shadcn";
import { useCreateBlockNote } from "@blocknote/react";
import { Block } from "@blocknote/core";
import "@blocknote/shadcn/style.css";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function Main() {
  // Stores the document JSON.
  const [blocks, setBlocks] = React.useState<Block[]>([]);

  // Creates a new editor instance.
  const editor = useCreateBlockNote();

  // Renders the editor instance using a React component.

  const onSave = () => {
    toast(`Content saved successfully.`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Button onClick={onSave}>Save</Button>
      </div>
      <BlockNoteView
        editor={editor}
        theme={"light"}
        formattingToolbar={true}
        emojiPicker={true}
        onChange={() => {
          // Saves the document JSON to state.
          setBlocks(editor.document);
        }}
      />
    </div>
  );
}
