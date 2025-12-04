import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "microdramas.json");

export function readMicrodramas() {
  try {
    const raw = fs.readFileSync(dbPath, "utf-8");
    const parsed = JSON.parse(raw);
    return parsed.episodes || [];
  } catch (e) {
    return [];
  }
}

export function writeMicrodramas(episodes: any[]) {
  const payload = JSON.stringify({ episodes }, null, 2);
  fs.writeFileSync(dbPath, payload);
}
