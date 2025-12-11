"use client";

import { useEffect, useState } from "react";

export function useChat(streamId: string) {
  const [messages, setMessages] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(`wss://parablestreaming.com/api/ws`);
    setWs(socket);

    socket.onmessage = (e) => {
      setMessages((prev) => [...prev, e.data]);
    };

    return () => socket.close();
  }, [streamId]);

  function send(msg: string) {
    if (ws) ws.send(msg);
  }

  return { messages, send };
}
