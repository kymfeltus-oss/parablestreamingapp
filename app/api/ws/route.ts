export const runtime = "edge";

// Access WebSocketPair from globalThis at runtime
// @ts-ignore
const WS = (globalThis as any).WebSocketPair;

export function GET(req: Request) {
  if (req.headers.get("upgrade") !== "websocket") {
    return new Response("Expected websocket", { status: 400 });
  }

  // @ts-ignore - TS does not know WebSocketPair exists on Edge runtime
  const pair = new WS();

  const client = pair[0];
  const server = pair[1];

  server.accept();

  server.addEventListener("message", (event: any) => {
    server.send(event.data); // echo for now
  });

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}
