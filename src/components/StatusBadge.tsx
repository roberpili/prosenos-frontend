import { MatchStatus } from "@/types";
import "@/app/styles/status-badge.css";

interface StatusBadgeProps {
  status: MatchStatus;
  minute: number;
  clock?: string | null;
  quarter?: number | null;
}

export const StatusBadge = ({ status, minute, clock, quarter }: StatusBadgeProps) => {
  if (status === "live") {
    const label =
      quarter && clock
        ? `Q${quarter} ${clock}`
        : clock
          ? clock
          : `${minute}'`;

    return (
      <span className="status-badge status-live">
        <span className="status-live-dot" aria-hidden="true" />
        {label}
      </span>
    );
  }

  if (status === "ET") {
    return <span className="status-badge status-neutral">ET</span>;
  }

  if (status === "finished") {
    return <span className="status-badge status-neutral">Final</span>;
  }

  if (status === "postponed") {
    return <span className="status-badge status-neutral">Postponed</span>;
  }

  return null;
};
