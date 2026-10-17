import "@/app/styles/team-scorers.css";

interface TeamScorersProps {
  teamName: string;
  scorers?: string[];
  align: "left" | "right";
}

export const TeamScorers = ({
  teamName,
  scorers = [],
  align,
}: TeamScorersProps) => {
  const isRight = align === "right";

  return (
    <ul
      className={`team-display-scorers ${
        isRight ? "team-display-scorers-right" : "team-display-scorers-left"
      }`}
      aria-label={`${teamName} scorers`}
    >
      {scorers.map((scorer, index) => (
        <li
          key={`${scorer}-${index}`}
          className={`team-display-scorer ${isRight ? "team-display-scorer-right" : ""}`}
        >
          {scorer}
        </li>
      ))}
    </ul>
  );
};
