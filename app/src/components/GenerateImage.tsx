import { Game } from "@/types/Game";
import Image from "next/image";
import TeamColor from "./TeamColor";

interface IGenerateImageProps {
  currentGame: Game | undefined;
}

const GenerateImage = ({ currentGame }: IGenerateImageProps) => {
  if (!currentGame) {
    return <></>;
  }

  return (
    <div className="w-1/3 h-full flex flex-col gap-4 justify-center">
      <div className="flex flex-col gap-4 items-center">
        <p className="italic">{currentGame.Match}</p>
        <div className="flex gap-4 justify-center items-center">
          <div className="flex flex-col gap-2 items-center">
            <Image
              id="HomeTeamLogo"
              src={currentGame["Domicile - Logo (sm)"]}
              width={150}
              height={150}
              alt="Home picture"
            />
            <p className="text-primary font-bold">
              {currentGame["Domicile - Final"]}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl text-primary font-bold">vs</div>
            <TeamColor />
          </div>
          <div className="flex flex-col gap-2 items-center">
            <Image
              id="AwayTeamLogo"
              src={currentGame["Extérieur - Logo (sm)"]}
              width={150}
              height={150}
              alt="Away Picture"
            />
            <p className="text-primary font-bold">
              {currentGame["Extérieur - Final"]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateImage;
