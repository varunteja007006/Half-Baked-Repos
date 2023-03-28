import React, { useState } from "react";
import axios from "axios";

function Chat() {
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");

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
          Authorization: "Bearer YOUR_API_KEY",
        },
      }
    );

    setChatHistory([
      ...chatHistory,
      { text: input },
      { text: response.data.choices[0].text },
    ]);
    setInput("");
  };

  return (
    <div>
      <ul>
        {chatHistory.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
