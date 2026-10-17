import Image from "next/image";
import { Team } from "@/types";
import { cleanLogoPath } from "@/utils/cleanLogoName";
import "@/app/styles/team-display.css";

interface TeamDisplayProps {
  team: Team;
  align: "left" | "right";
}

export const TeamDisplay = ({ team, align }: TeamDisplayProps) => {
  const isRight = align === "right";

  return (
    <section
      className={`team-display ${
        isRight ? "team-display-right" : "team-display-left"
      }`}
      aria-label={`${team.name} team`}
    >
      <div
        className={`team-display-identity ${
          isRight ? "team-display-identity-right" : "team-display-identity-left"
        }`}
      >
        {isRight && (
          <span className="team-display-name team-display-name-right">
            {team.name}
          </span>
        )}

        <Image
          src={cleanLogoPath(team.name)}
          alt=""
          width={20}
          height={20}
          className="team-display-logo"
        />

        {!isRight && <span className="team-display-name">{team.name}</span>}
      </div>
    </section>
  );
};
