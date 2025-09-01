import { Configuration, OpenAIApi } from "openai";
import React, { useState } from "react";
import axios from "axios";

function Home() {
  const [chatHistory, setChatHistory] = useState<{ text: string }[]>([]);
  const [input, setInput] = useState<string>("");

  const configuration = new Configuration({
    organization: import.meta.env.VITE_OPENAI_ORG_KEY,
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const sendMessage = async () => {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt: input,
        max_tokens: 60,
        n: 1,
        stop: "\n",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    console.log(response);
  setChatHistory([
    ...chatHistory,
    { text: input },
    { text: response.data.choices[0].text },
  ]);
  setInput("");
  };

  return (
    <div className="p-2 bg-lime-200 w-full h-screen flex sm:flex-col md:flex-col">
      <h1 className="m-2 text-3xl">Home</h1>
      <div className="flex sm:flex-col flex-row w-full h-3/5">
        <div className="bg-blue-300 w-2/4 h-1/2 p-2 m-2">
          <h1 className=" text-xl font-semibold mb-2 text-center">
            Chat Input
          </h1>

          <form
            className="p-2 text-center items-center"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <input
              className="w-full rounded-md p-2 border-2 border-black"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="border-2 border-black p-2 rounded-full m-2 bg-green-700 font-semibold text-yellow-500"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
        <div className=" bg-orange-400 w-2/4 h-70 p-2 m-2 ">
          <h1 className=" text-xl font-semibold mb-2">Chat Output</h1>
          <ul className=" font-mono text-white bg-fuchsia-900 p-2 h-40 w-full overflow-y-scroll">
            {chatHistory.map((message, index) => (
              <li key={index} className="p-2 border-b-2">
                {index % 2 == 0 && `User: ` + `${message.text}`}
                {index % 2 != 0 && `OpenAI bot: ` + `${message.text}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
