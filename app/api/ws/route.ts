// app/api/ws/route.ts

// Optional: Import the type explicitly for better local type checking if needed
// declare class WebSocketPair {
//   readonly [0]: WebSocket;
//   readonly [1]: WebSocket;
// }

// Confirms this route should run in the Vercel Edge runtime environment.
export const runtime = "edge"; 

export function GET(req: Request) {
  if (req.headers.get("upgrade") !== "websocket") {
    // If it's not a websocket upgrade request, return a standard HTTP error response.
    return new Response("Expected websocket", { status: 400 });
  }

  // Create a WebSocket pair: a client part to return in the response, 
  // and a server part to manage the connection logic.
  const pair = new WebSocketPair();
  const client = pair[0];
  const server = pair[1];

  // Accept the connection on the server side.
  server.accept();

  // Define the behavior for the server-side connection:
  // When a message is received from the client, send the same data back.
  server.addEventListener("message", (event) => {
    server.send(event.data);
  });

  server.addEventListener("close", () => {
    console.log("WebSocket connection closed.");
  });
  
  server.addEventListener("error", (error) => {
    console.error("WebSocket error:", error);
  });


  // Return an HTTP 101 Switching Protocols response, linking the client side of the pair.
  // This response tells the browser/client that the connection is now a WebSocket.
  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}
