import { formatDateParam } from "@/api/helpers";
import { MatchView } from "@/components/MatchView";
import { parseDateParam } from "@/utils/matches";
import { Match } from "@/types";
import { fetchNBAMatches } from "@/api/nba";
import { fetchFutbolMatches } from "@/api/futbol";

interface PageProps {
  searchParams: Promise<{ date?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const dateParam = params.date ?? formatDateParam(new Date());
  const date = parseDateParam(dateParam);
  const backendUrl =
    process.env.DEVELOPMENT === "true"
      ? "http://localhost:8000"
      : process.env.BACKEND_URL;

  let matches: Match[] = [];
  let error: string | null = null;
  const errors: string[] = [];

  try {
    const futbol = await fetchFutbolMatches(date, backendUrl);
    matches = matches.concat(futbol);
  } catch (err) {
    errors.push(err instanceof Error ? err.message : "unknown error");
  }

  try {
    const nba = await fetchNBAMatches(date, backendUrl);
    matches = matches.concat(nba);
  } catch (err) {
    errors.push(err instanceof Error ? err.message : "unknown error");
  }

  if (matches.length === 0 && errors.length > 0) {
    error = errors.join("; ");
  }

  return (
    <MatchView
      initialMatches={matches}
      initialDate={dateParam}
      initialError={error}
    />
  );
}
