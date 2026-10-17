"use client";

import { formatDateParam, isToday, mapMatch, mapNbaMatch } from "@/api/helpers";
import { LiveUpdateMessage, Match, Sport } from "@/types";
import { groupMatchesByLeague, parseDateParam } from "@/utils/matches";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MatchViewHeader } from "./MatchViewHeader";
import { DateNavigator } from "./DateNavigator";
import { MatchResult } from "./MatchResult";
import "@/app/styles/match-view.css";

interface MatchViewProps {
  initialMatches: Match[];
  initialDate: string;
  initialError: string | null;
  initialSport: Sport;
  liveUrl?: string;
}

const RECONNECT_DELAY = 3000;

export const MatchView = ({
  initialMatches,
  initialDate,
  initialError,
  initialSport,
  liveUrl,
}: MatchViewProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sport, setSport] = useState<Sport>(initialSport);
  const [matches, setMatches] = useState(initialMatches);
  const [liveConnected, setLiveConnected] = useState(false);

  const currentDateParam = searchParams.get("date") ?? initialDate;
  const currentDate = parseDateParam(currentDateParam);

  useEffect(() => {
    if (!liveUrl || !isToday(parseDateParam(currentDateParam))) {
      return;
    }

    let socket: WebSocket | null = null;
    let retry: ReturnType<typeof setTimeout> | null = null;
    let disposed = false;

    const connect = () => {
      socket = new WebSocket(liveUrl);

      socket.onopen = () => {
        if (!disposed) setLiveConnected(true);
      };

      socket.onmessage = (event) => {
        let message: LiveUpdateMessage;
        try {
          message = JSON.parse(event.data) as LiveUpdateMessage;
        } catch {
          return;
        }

        if (message.type !== "live_update") return;

        const next =
          message.sport === "nba"
            ? message.matches.map(mapNbaMatch)
            : message.matches.map(mapMatch);

        setMatches((prev) => [
          ...prev.filter((match) => match.sport !== message.sport),
          ...next,
        ]);
      };

      socket.onclose = () => {
        if (disposed) return;
        setLiveConnected(false);
        retry = setTimeout(connect, RECONNECT_DELAY);
      };

      socket.onerror = () => {
        socket?.close();
      };
    };

    connect();

    return () => {
      disposed = true;
      if (retry) clearTimeout(retry);
      socket?.close();
    };
  }, [liveUrl, currentDateParam]);

  const grouped = useMemo(
    () => groupMatchesByLeague(matches, sport),
    [matches, sport],
  );

  const changeSport = (next: Sport) => {
    setSport(next);
    router.replace(`/?sport=${next}&date=${currentDateParam}`);
  };

  const navigateDate = (offset: number) => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + offset);
    router.push(`/?sport=${sport}&date=${formatDateParam(next)}`);
  };

  return (
    <div className="match-view">
      <MatchViewHeader
        sport={sport}
        onSportChange={changeSport}
        live={liveConnected}
      />

      <main className="match-main">
        <div className="match-content">
          <DateNavigator
            date={currentDate}
            onPrev={() => navigateDate(-1)}
            onNext={() => navigateDate(1)}
          />
          <MatchResult loading={false} error={initialError} grouped={grouped} />
        </div>
      </main>
    </div>
  );
};
