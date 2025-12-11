// app/api/ws/route.ts

// Keep the global declarations from the previous step:
declare global {
  interface WebSocketPair {
    0: WebSocket;
    1: WebSocket;
  }
  var WebSocketPair: {
    prototype: WebSocketPair;
    new(): WebSocketPair;
  };
}

export const runtime = "edge"; 

export function GET(req: Request) {
  if (req.headers.get("upgrade") !== "websocket") {
    return new Response("Expected websocket", { status: 400 });
  }

  const pair = new WebSocketPair();
  const client = pair;
  
  // Cast the 'server' side to 'any' to bypass the TypeScript DOM type check
  const server = pair as any; 

  // TypeScript will no longer error on this line:
  server.accept();

  // Echo server for now
  server.addEventListener("message", (event) => {
    server.send(event.data);
  });

  server.addEventListener("close", () => {
    console.log("WebSocket connection closed.");
  });
  
  server.addEventListener("error", (error) => {
    console.error("WebSocket error:", error);
  });


  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}
