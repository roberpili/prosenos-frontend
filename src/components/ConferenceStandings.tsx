import Image from "next/image";
import { NbaStandingTeam } from "@/types";
import "@/app/styles/conference-standings.css";

type Conference = "east" | "west";

interface ConferenceStandingsProps {
  conference: Conference;
  teams: NbaStandingTeam[];
}

const TITLES: Record<Conference, string> = {
  east: "Eastern Conference",
  west: "Western Conference",
};

function formatPercentage(value: number): string {
  return value.toFixed(3).replace(/^0/, "");
}

function formatGamesBehind(value: number): string {
  if (value === 0) return "—";
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

function seedClass(index: number): string {
  if (index < 6) return "standings-row-playoff";
  if (index < 10) return "standings-row-playin";
  return "";
}

export const ConferenceStandings = ({
  conference,
  teams,
}: ConferenceStandingsProps) => {
  const title = TITLES[conference];

  return (
    <section
      className={`standings-card standings-card-${conference}`}
      aria-label={title}
    >
      <header className="standings-card-header">
        <h2 className="standings-card-title">{title}</h2>
      </header>

      <div className="standings-table-wrap">
        <table className="standings-table">
          <thead>
            <tr>
              <th scope="col" className="standings-col-rank">
                #
              </th>
              <th scope="col" className="standings-col-team">
                Team
              </th>
              <th scope="col">W</th>
              <th scope="col">L</th>
              <th scope="col">PCT</th>
              <th scope="col">GB</th>
              <th scope="col">STRK</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => {
              const isWin = team.streak.startsWith("W");

              return (
                <tr key={team.id} className={seedClass(index)}>
                  <td className="standings-rank">{index + 1}</td>
                  <td className="standings-team-cell">
                    <div className="standings-team">
                      <Image
                        src={team.logo}
                        alt=""
                        width={24}
                        height={24}
                        className="standings-logo"
                      />
                      <span className="standings-abbr">
                        {team.abbreviation}
                      </span>
                      <span className="standings-name">{team.name}</span>
                    </div>
                  </td>
                  <td>{team.wins}</td>
                  <td>{team.losses}</td>
                  <td className="standings-pct">
                    {formatPercentage(team.win_percentage)}
                  </td>
                  <td className="standings-gb">
                    {formatGamesBehind(team.games_behind)}
                  </td>
                  <td>
                    <span
                      className={`standings-streak ${
                        isWin ? "standings-streak-win" : "standings-streak-loss"
                      }`}
                    >
                      {team.streak}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
