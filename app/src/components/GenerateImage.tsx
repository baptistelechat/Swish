import Image from "next/image";

interface IGenerateImageProps {
  currentGame: any | undefined;
}

const GenerateImage = ({ currentGame }: IGenerateImageProps) => {
  return (
    <div className="w-1/3 h-full flex flex-col gap-4 justify-center">
      {currentGame ? (
        <div className="flex flex-col gap-4 items-center">
          <p className="italic">
            {currentGame?.properties.Match.title[0]["plain_text"]}
          </p>
          <div className="flex gap-4 justify-center items-center">
            <div className="flex flex-col gap-2 items-center">
              <Image
                src={currentGame.properties["Domicile - Logo (sm)"].url}
                width={150}
                height={150}
                alt="Home picture"
              />
              <p className="text-primary font-bold">
                {currentGame.properties["Domicile - Final"].number}{" "}
              </p>
            </div>
            <div className="text-2xl text-primary font-bold">vs</div>
            <div className="flex flex-col gap-2 items-center">
              <Image
                src={currentGame.properties["Extérieur - Logo (sm)"].url}
                width={150}
                height={150}
                alt="Away Picture"
              />
              <p className="text-primary font-bold">
                {currentGame.properties["Extérieur - Final"].number}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div
        className={`h-1/2 p-4 bg-secondary overflow-scroll ${
          currentGame
            ? ""
            : "text-xl text-primary font-bold flex justify-center items-center"
        }`}
      >
        <pre>
          {currentGame ? JSON.stringify(currentGame, null, 4) : "Non défini"}
        </pre>
      </div>
    </div>
  );
};

export default GenerateImage;
