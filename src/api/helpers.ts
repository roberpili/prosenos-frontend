import { ApiMatch, ApiNbaMatch, Match, MatchStatus } from "@/types";

export function mapMatch(raw: ApiMatch): Match {
  return {
    id: raw.id,
    homeTeam: { name: raw.home_team },
    awayTeam: { name: raw.away_team },
    homeScore: raw.home_score,
    awayScore: raw.away_score,
    homePenalties: raw.home_penalties,
    awayPenalties: raw.away_penalties,
    aggHomeScore: raw.agg_home_score,
    aggAwayScore: raw.agg_away_score,
    status: mapStatus(raw.status, raw.qualifies),
    league: raw.league,
    sport: "futbol",
    minute: raw.minute ?? -1,
    kickoff: formatKickoff(raw.kickoff),
    homeScorers: raw.home_scorers,
    awayScorers: raw.away_scorers,
    qualifies: raw.qualifies,
    clock: null,
    quarter: null,
    overtime: null,
    seasonStatus: null,
  };
}

function mapStatus(status: string, qualifies: number | null): MatchStatus {
  const s = status.toLowerCase();
  if (s === "primer tiempo" || s === "segundo tiempo") return "live";
  if (s === "entretiempo") return "ET";
  if (s === "finalizado" || s === "final") return "finished";
  if (s === "por penales") {
    return qualifies !== null && qualifies > 0 ? "finished" : "live";
  }
  if (s === "postponed" || s === "ppd") return "postponed";
  return "scheduled";
}

export function isToday(d: Date): boolean {
  const now = new Date();

  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
}

export function isYesterday(d: Date): boolean {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  return (
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear()
  );
}

export function isTomorrow(d: Date): boolean {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  return (
    d.getDate() === tomorrow.getDate() &&
    d.getMonth() === tomorrow.getMonth() &&
    d.getFullYear() === tomorrow.getFullYear()
  );
}

export function mapNbaStatus(status: string): MatchStatus {
  const s = status.toUpperCase();
  if (s.includes("FINAL")) return "finished";
  if (s === "STATUS_HALFTIME") return "ET";
  if (
    s.includes("IN_PROGRESS") ||
    s.includes("END_PERIOD") ||
    s.includes("HALFTIME") ||
    s.includes("OVERTIME")
  )
    return "live";
  if (s.includes("POSTPONED") || s.includes("DELAYED")) return "postponed";
  return "scheduled";
}

export function mapNbaMatch(raw: ApiNbaMatch): Match {
  return {
    id: raw.id,
    homeTeam: { name: raw.home_team },
    awayTeam: { name: raw.away_team },
    homeScore: raw.home_score,
    awayScore: raw.away_score,
    aggHomeScore: null,
    aggAwayScore: null,
    homePenalties: null,
    awayPenalties: null,
    status: mapNbaStatus(raw.status),
    league: "NBA",
    sport: "nba",
    minute: 0,
    kickoff: raw.kickoff ? formatKickoff(raw.kickoff) : "",
    qualifies: null,
    homeScorers: [],
    awayScorers: [],
    clock: raw.clock,
    quarter: raw.quarter,
    overtime: raw.overtime,
    seasonStatus: raw.season_staus,
  };
}

export function formatDateParam(d: Date): string {
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
}

export function formatKickoff(d: string): string {
  return d.split("T")[1].slice(0, 5);
}

// page.tsx
export function parseDate(dateStr: string | undefined): Date {
  if (dateStr) {
    const [day, month, year] = dateStr.split("-").map(Number);
    if (day && month && year) {
      const parsed = new Date(year, month - 1, day);
      if (formatDateParam(parsed) === dateStr) {
        return parsed;
      }
    }
  }

  return new Date();
}
