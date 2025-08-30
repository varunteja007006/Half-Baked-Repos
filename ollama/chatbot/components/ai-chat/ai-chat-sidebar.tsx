import React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "../ui/button";

export default function AIChatSidebar({
  checked,
  setChecked,
}: Readonly<{
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  return (
    <div>
      <CustomDiv>
        <p className="font-bold">
          What is the difference between prompts and chat?
        </p>
        <p>
          Prompts are the initial inputs to the model, while chat is the
          conversation between the user and the model.
        </p>
        <div className="flex items-center gap-5 flex-row justify-start">
          <p>Prompts</p>
          <Switch checked={checked} onCheckedChange={setChecked} />
          <p>Chat</p>
        </div>
      </CustomDiv>
      <CustomDiv>
        <p>
          This project is simple chat bot that users can use to chat with the ai
          model run locally. The model I am running is llama3.2:3b.{""}
          <a href="https://ollama.com/library/llama3.2">llama3.2:3b</a>
        </p>
      </CustomDiv>
    </div>
  );
}

const CustomDiv = (props: React.PropsWithChildren) => {
  return (
    <div className="py-2 px-3 rounded border m-2 space-y-2">
      {props.children}
    </div>
  );
};
