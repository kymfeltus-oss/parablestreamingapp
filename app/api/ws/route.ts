export const runtime = "edge";

export default async function handler(req: Request) {
  if (req.headers.get("upgrade") !== "websocket") {
    return new Response("Expected websocket", { status: 400 });
  }

  const pair = new WebSocketPair();
  const client = pair[0];
  const server = pair[1];

  server.accept();

  server.addEventListener("message", (event) => {
    server.send(event.data); // echo for now
  });

  return new Response(null, { status: 101, webSocket: client });
}
