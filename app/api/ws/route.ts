export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  if (req.headers.get("upgrade") !== "websocket") {
    return new Response("Expected websocket", { status: 400 });
  }

  const [client, server] = Object.values(new WebSocketPair());
  server.accept();

  server.addEventListener("message", (event) => {
    server.send(event.data); // echo chat for now
  });

  return new Response(null, { status: 101, webSocket: client });
}
