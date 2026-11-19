import Link from "next/link";
import { NbaStandings } from "@/types";
import { ConferenceStandings } from "./ConferenceStandings";
import "@/app/styles/nba-leaderboard.css";

interface NbaLeaderboardProps {
  leaderboard: NbaStandings | null;
  error: string | null;
}

export const NbaLeaderboard = ({ leaderboard, error }: NbaLeaderboardProps) => {
  return (
    <div className="leaderboard-view">
      <header className="leaderboard-header">
        <div className="leaderboard-header-content">
          <Link href="/" className="leaderboard-title-link">
            <h1 className="leaderboard-title">Prosenos</h1>
          </Link>
          <Link href="/?sport=nba" className="leaderboard-back-link">
            NBA Matches
          </Link>
        </div>
      </header>

      <main className="leaderboard-main">
        <div className="leaderboard-content">
          <div className="leaderboard-heading">
            <div>
              <h2 className="leaderboard-heading-title">NBA Standings</h2>
            </div>

            <ul className="leaderboard-legend" aria-label="standings legend">
              <li>
                <span className="leaderboard-legend-dot leaderboard-legend-playoff" />
                Playoffs
              </li>
              <li>
                <span className="leaderboard-legend-dot leaderboard-legend-playin" />
                Play-in
              </li>
            </ul>
          </div>

          {error ? (
            <p className="leaderboard-error">{error}</p>
          ) : leaderboard ? (
            <div className="leaderboard-grid">
              <ConferenceStandings
                conference="east"
                teams={leaderboard.eastern_conference}
              />
              <ConferenceStandings
                conference="west"
                teams={leaderboard.western_conference}
              />
            </div>
          ) : (
            <p className="leaderboard-message">
              There are no standings available.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};
