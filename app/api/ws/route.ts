export const runtime = "edge";

// Access WebSocketPair from globalThis at runtime
// @ts-ignore - TS doesn't know about this global
const WS = (globalThis as any).WebSocketPair;

export function GET(req: Request) {
  if (req.headers.get("upgrade") !== "websocket") {
    return new Response("Expected websocket", { status: 400 });
  }

  // @ts-ignore - TS does not know WebSocketPair exists on Edge runtime
  const pair = new WS();

  const client = pair[0];
  // @ts-ignore - 'server' is a WebSocket from a type perspective, but needs accept() in this runtime
  const server = pair[1];

  // @ts-ignore - Property 'accept' does not exist on type 'WebSocket'
  server.accept();

  server.addEventListener("message", (event: any) => {
    server.send(event.data); // echo for now
  });
  
  // You still need to deal with the Response object type error:
  return new Response(null, {
    status: 101,
    webSocket: client,
    // @ts-ignore - Property 'webSocket' does not exist in type 'ResponseInit'
  } as any); // Cast the whole options object
}
