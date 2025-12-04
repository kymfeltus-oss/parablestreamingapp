import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "streams.json");

export function readStreams() {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data).streams || [];
}

export function writeStreams(streams: any[]) {
  fs.writeFileSync(dbPath, JSON.stringify({ streams }, null, 2));
}
