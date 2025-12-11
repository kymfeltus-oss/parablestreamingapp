"use client";

import { useEffect, useState } from "react";

export default function ChatPanel({ streamId }: { streamId: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    loadMessages();
    const interval = setInterval(() => loadMessages(), 3000);
    return () => clearInterval(interval);
  }, []);

  async function loadMessages() {
    const res = await fetch("/api/chat/list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ streamId }),
    });

    const json = await res.json();
    if (json.ok) setMessages(json.messages);
  }

  async function sendMessage() {
    if (!input.trim()) return;

    await fetch("/api/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ streamId, message: input }),
    });

    setInput("");
    loadMessages();
  }

  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-4 h-96 flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((m, i) => (
          <div key={i} className="text-sm text-gray-300">
            <span className="text-[#53fc18] mr-1">•</span>
            {m.message}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-black border border-white/20 rounded px-3 py-2 text-sm"
          placeholder="Say something..."
        />
        <button
          onClick={sendMessage}
          className="bg-[#53fc18] text-black px-4 text-sm font-bold rounded hover:brightness-110"
        >
          Send
        </button>
      </div>
    </div>
  );
}
