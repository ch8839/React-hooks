import { useState } from "react";
import { Input, Button } from "antd";
import ollama from "ollama/browser";
import ReactMarkdown from "react-markdown";

export const AiChatStream = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isThinking, setIsThinking] = useState<boolean>(false);
  // const [thinking, setThinking] = useState<string>("");
  const [content, setContent] = useState<any[]>([]);

  const handleSend = async () => {
    console.log("inputValue", inputValue);
    let thinking = ""
    let curContent = "";
    const createdAt = new Date().toISOString();
    const stream = await ollama.chat({
      model: "deepseek-r1",
      messages: [{ role: "user", content: inputValue }],
      stream: true,
    });
    setIsThinking(true);
    for await (const chunk of stream) {
      // console.log("chunk", chunk);
      if (chunk.message.thinking) {
        if (!isThinking) {
          setIsThinking(true);
        }
        // accumulate the partial thinking
        thinking = thinking + chunk.message.thinking;
        setContent([
          ...content,
          {
            id: chunk.id,
            role: "assistant",
            content: "",
            thinking,
            createdAt,
          },
        ]);
      } else if (chunk.message.content) {     
        setIsThinking(false);
        curContent = curContent + chunk.message.content;
        setContent([
          ...content,
          {
            id: chunk.id,
            role: "assistant",
            content: curContent,
            thinking,
            createdAt,
          },
        ]);
      }
    }
    setIsThinking(false);
    console.log("content", content);
  };

  return (
    <div>
      <Input.TextArea
        rows={4}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button onClick={handleSend}>发送</Button>

      <div id="ai-chat-response">
        {content.map((message) => (
          <div key={message.id} style={{ marginBottom: 10 }}>
            <div>{isThinking ? "Thinking..." : ""}</div>
            <div>{message.createdAt}</div>
            <pre style={{ fontSize: 14, color: "rgb(196, 199, 197)", whiteSpace: "pre-wrap" }}>{message.thinking ? message.thinking : ""}</pre>
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
};
