import Image from "next/image";

interface IGenerateImageProps {
  currentGame: any | undefined;
}

const GenerateImage = ({ currentGame }: IGenerateImageProps) => {
  return (
    <div className="w-1/3 h-full flex flex-col gap-4 justify-center">
      <div className=" bg-secondary overflow-scroll">
        <pre>
          {currentGame ? JSON.stringify(currentGame, null, 4) : "Non défini"}
        </pre>
      </div>
      <p className="italic">
        {currentGame?.properties.Match.title[0]["plain_text"]}
      </p>
      {currentGame ? (
        <div className="flex gap-4 justify-center">
          <div className="flex flex-col gap-2  items-center">
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
          <div className="flex flex-col gap-2  items-center">
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
      ) : (
        <></>
      )}
    </div>
  );
};

export default GenerateImage;
