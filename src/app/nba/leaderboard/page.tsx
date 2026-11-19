import type { Metadata } from "next";
import { fetchNBALeaderboard } from "@/api/nba";
import { NbaLeaderboard } from "@/components/NbaLeaderboard";
import { NbaStandings } from "@/types";

export const metadata: Metadata = {
  title: "NBA Standings | Prosenos",
};

export default async function NbaLeaderboardPage() {
  const backendUrl =
    process.env.DEVELOPMENT === "true"
      ? "http://localhost:8000"
      : process.env.BACKEND_URL;

  let leaderboard: NbaStandings | null = null;
  let error: string | null = null;

  try {
    leaderboard = await fetchNBALeaderboard(backendUrl);
  } catch (err) {
    error = err instanceof Error ? err.message : "unknown error";
  }

  return <NbaLeaderboard leaderboard={leaderboard} error={error} />;
}
