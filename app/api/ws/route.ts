// app/api/ws/route.ts

// This declaration ensures TypeScript knows about WebSocketPair 
// even if the global environment context isn't fully loaded during the build worker pass.
declare global {
  interface WebSocketPair {
    0: WebSocket;
    1: WebSocket;
  }
}

export const runtime = "edge"; 

export function GET(req: Request) {
  if (req.headers.get("upgrade") !== "websocket") {
    return new Response("Expected websocket", { status: 400 });
  }

  // TypeScript should now recognize WebSocketPair due to the declaration above
  const pair = new WebSocketPair();
  // We use client/server aliases for clarity if needed, but pair works too.
  const client = pair[0];
  const server = pair[1];

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
    webSocket: client, // Return the client side of the pair
  });
}
