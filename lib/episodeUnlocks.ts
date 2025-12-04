import fs from "fs";
import path from "path";

const unlockPath = path.join(process.cwd(), "data", "user_episode_unlocks.json");

export function readUnlocks() {
  try {
    const raw = fs.readFileSync(unlockPath, "utf-8");
    return JSON.parse(raw).unlocks || [];
  } catch (e) {
    return [];
  }
}

export function writeUnlocks(unlocks: any[]) {
  const payload = JSON.stringify({ unlocks }, null, 2);
  fs.writeFileSync(unlockPath, payload);
}

export function isUnlocked(userId: string, episodeId: string) {
  const unlocks = readUnlocks();
  return unlocks.some((u: any) => u.userId === userId && u.episodeId === episodeId);
}

export function addUnlock(userId: string, episodeId: string) {
  const unlocks = readUnlocks();
  unlocks.push({
    userId,
    episodeId,
    unlockedAt: new Date().toISOString(),
  });
  writeUnlocks(unlocks);
}
