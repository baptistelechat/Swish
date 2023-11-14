"use client";
import { useState } from "react";
import GameForm from "./GameForm";
import GenerateImage from "./GenerateImage";

interface IFormContainerProps {
  gamesId: string[];
}

const FormContainer = ({ gamesId }: IFormContainerProps) => {
  const [currentGame, setCurrentGame] = useState<any | undefined>(undefined);

  return (
    <div className="flex h-full justify-center items-center gap-8">
      <GameForm
        extraStyle={"w-1/3"}
        gamesId={gamesId}
        setCurrentGame={setCurrentGame}
      />
      <GenerateImage currentGame={currentGame} />
    </div>
  );
};

export default FormContainer;
