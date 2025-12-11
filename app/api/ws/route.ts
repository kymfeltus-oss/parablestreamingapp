export const runtime = "edge";

export function GET(req: Request) {
  if (req.headers.get("upgrade") !== "websocket") {
    return new Response("Expected websocket", { status: 400 });
  }

  const pair = new WebSocketPair();
  const client = pair[0];
  const server = pair[1];

  server.accept();

  // Echo server for now
  server.addEventListener("message", (event) => {
    server.send(event.data);
  });

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}
