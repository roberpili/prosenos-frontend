import { MatchStatus } from "@/types";
import { StatusBadge } from "./StatusBadge";
import "@/app/styles/match-time-status.css";

interface MatchTimeStatusProps {
  status: MatchStatus;
  kickoff?: string;
  minute: number;
  clock?: string | null;
  quarter?: number | null;
}

export const MatchTimeStatus = ({
  status,
  kickoff,
  minute,
  clock,
  quarter,
}: MatchTimeStatusProps) => {
  return (
    <div className="match-time-status">
      {status === "scheduled" ? (
        <span className="match-time-status-kickoff">{kickoff ?? "—"}</span>
      ) : (
        <StatusBadge status={status} minute={minute} clock={clock} quarter={quarter} />
      )}
    </div>
  );
};
