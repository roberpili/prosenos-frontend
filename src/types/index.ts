export type Sport = "futbol" | "nba";

export type MatchStatus =
  "scheduled" | "live" | "finished" | "postponed" | "ET";

export interface Team {
  name: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number | null;
  awayScore: number | null;
  aggHomeScore: number | null;
  aggAwayScore: number | null;
  homePenalties: number | null;
  awayPenalties: number | null;
  status: MatchStatus;
  league: string;
  sport: Sport;
  minute: number;
  kickoff: string;
  qualifies: number | null;
  homeScorers: number[];
  awayScorers: number[];
  clock: string | null;
  quarter: number | null;
  overtime: boolean | null;
  seasonStatus: string | null;
}

export interface ApiMatch {
  id: string;
  league: string;
  home_team: string;
  away_team: string;
  home_score: number | null;
  away_score: number | null;
  agg_home_score: number | null;
  agg_away_score: number | null;
  home_penalties: number | null;
  away_penalties: number | null;
  status: string;
  minute: number;
  kickoff: string;
  qualifies: number | null;
  home_scorers: number[];
  away_scorers: number[];
}

export interface ApiNbaMatch {
  id: string;
  season_staus: string | null;
  home_team: string;
  away_team: string;
  home_score: number | null;
  away_score: number | null;
  status: string;
  quarter: number | null;
  kickoff: string | null;
  clock: string | null;
  overtime: boolean | null;
}

export type LiveUpdateMessage =
  | { type: "live_update"; sport: "futbol"; matches: ApiMatch[] }
  | { type: "live_update"; sport: "nba"; matches: ApiNbaMatch[] };
