import { Match } from "@/types";
import { cleanLogoPath } from "@/utils/cleanLogoName";
import Image from "next/image";
import { MatchCard } from "./MatchCard";
import "@/app/styles/league.css";

interface LeagueSectionProps {
  league: string;
  matches: Match[];
}

export const LeagueSection = ({ league, matches }: LeagueSectionProps) => {
  return (
    <section className="league">
      {/* league header colors */}
      <header className="league-header">
        <div className="league-title">
          <Image
            src={cleanLogoPath(league)}
            alt={`${league} logo`}
            className="league-logo"
            width={46}
            height={46}
          />

          <h2 className="league-name">{league}</h2>
        </div>
      </header>

      {/* matches container */}
      <div className="league-matches">
        {matches.map((match) => {
          const isLive = match.status === "live";
          const showScore =
            match.homeScore !== null && match.awayScore !== null;
          const hasAggregate =
            match.aggHomeScore !== null && match.aggAwayScore !== null;
          const hasPenalties =
            match.homePenalties !== null && match.awayPenalties !== null;

          return (
            <MatchCard
              key={match.id}
              match={match}
              status={match.status}
              isLive={isLive}
              kickoff={match.kickoff}
              clock={match.clock}
              quarter={match.quarter}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              homeScorers={match.homeScorers.map(String)}
              awayScorers={match.awayScorers.map(String)}
              showScore={showScore}
              homeScore={match.homeScore ?? undefined}
              awayScore={match.awayScore ?? undefined}
              hasAggregate={hasAggregate}
              aggHomeScore={match.aggHomeScore ?? undefined}
              aggAwayScore={match.aggAwayScore ?? undefined}
              hasPenalties={hasPenalties}
              homePenalties={match.homePenalties ?? undefined}
              awayPenalties={match.awayPenalties ?? undefined}
            />
          );
        })}
      </div>
    </section>
  );
};
