import { ApiNbaMatch, Match } from "@/types";
import { formatDateParam, isToday, isYesterday } from "./helpers";
import { mapNbaMatch } from "./helpers";

export async function fetchNBAMatches(
  date: Date,
  baseUrl?: string,
): Promise<Match[]> {
  let path: string;
  if (isToday(date)) {
    path = "/api/v1/nba/matches/today";
  } else if (isYesterday(date)) {
    path = "/api/v1/nba/matches/yesterday";
  } else {
    path = `/api/v1/nba/matches/${formatDateParam(date)}`;
  }

  const url = baseUrl ? `${baseUrl}${path}` : path;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error fetching NBA matches: ${res.status}`);
  }
  const data: ApiNbaMatch[] = await res.json();

  return data.map(mapNbaMatch);
}
