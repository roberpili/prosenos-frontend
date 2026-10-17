import Link from "next/link";
import { Sport } from "@/types";
import { SportTabs } from "./SportTabs";
import "@/app/styles/match-view-header.css";

interface MatchViewHeaderProps {
  sport: Sport;
  onSportChange: (sport: Sport) => void;
  live?: boolean;
}

export const MatchViewHeader = ({
  sport,
  onSportChange,
  live = false,
}: MatchViewHeaderProps) => {
  return (
    <header className="match-header">
      <div className="match-header-content">
        <Link href="/" className="match-title-link">
          <h1 className="match-title">Prosenos</h1>
        </Link>
        <div className="match-header-tabs">
          <SportTabs active={sport} onChange={onSportChange} />
          {live && (
            <span className="match-header-live" title="Live updates connected">
              <span className="match-header-live-dot" aria-hidden="true" />
              Live
            </span>
          )}
        </div>
      </div>
    </header>
  );
};
