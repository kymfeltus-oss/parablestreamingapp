// app/api/ws/route.ts

// Declare the global interface AND the global constructor function
declare global {
  interface WebSocketPair {
    0: WebSocket;
    1: WebSocket;
  }
  // This line tells TypeScript that a function/constructor named 'WebSocketPair' exists globally
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

  // The build worker should now accept this line:
  const pair = new WebSocketPair();
  
  // Note: Vercel's edge runtime API is slightly different from Cloudflare Workers' default API.
  // In many Next.js edge examples, the pair is accessed differently.
  // Let's adjust slightly for robust compatibility with Vercel's preferred access pattern:

  const client = pair[0];
  const server = pair[1];


  server.accept();

  // Echo server for now
  server.addEventListener("message", (event) => {
    server.send(event.data);
  });
  // ... (rest of event listeners) ...

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}
