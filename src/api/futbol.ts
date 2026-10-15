import { ApiMatch, Match } from "@/types";
import {
  formatDateParam,
  isToday,
  isYesterday,
  isTomorrow,
  mapMatch,
} from "./helpers";

export async function fetchFutbolMatches(
  date: Date,
  baseUrl?: string,
): Promise<Match[]> {
  let path: string;
  if (isToday(date)) {
    path = "/api/v1/futbol/matches/today";
  } else if (isYesterday(date)) {
    path = `/api/v1/futbol/matches/yesterday`;
  } else if (isTomorrow(date)) {
    path = `/api/v1/futbol/matches/tomorrow`;
  } else {
    path = `/api/v1/futbol/matches/${formatDateParam(date)}`;
  }

  const url = baseUrl ? `${baseUrl}${path}` : path;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error fetching futbol matches: ${res.status}`);
  }
  const data: ApiMatch[] = await res.json();

  return data.map(mapMatch);
}
