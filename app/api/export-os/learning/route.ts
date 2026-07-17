import { learningLevels } from "@/data/export-intelligence";

export async function GET() {
  return Response.json({
    levels: learningLevels,
    missionCount: learningLevels.reduce((total, level) => total + level.missions.length, 0),
  });
}
