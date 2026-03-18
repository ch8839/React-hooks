import { useState } from "react";
import { Input, Button } from "antd";
import ollama from 'ollama/browser'

export const AiChat = () => {
 
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);

  const handleSend = async () => {
    console.log("inputValue", inputValue);
    const response = await ollama.chat({
      model: "deepseek-r1",
      messages: [{ role: "user", content: inputValue }],
    });
    setMessages([...messages, { id: response.id, role: "assistant", content: response.message.content, createdAt: new Date().toISOString() }]);
    console.log("response", response);
  }

  return (
    <div>
      <Input.TextArea rows={4} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <Button onClick={handleSend}>发送</Button>

      <div id="ai-chat-response">
        {
          messages.map((message) => (
            <div key={message.id} style={{ marginBottom: 10 }}>
              <div>{message.createdAt}</div>
              <div>{message.role}</div>
              <div>{message.content}</div>
            </div>
          ))
        }
      </div>
    </div>
  )
};