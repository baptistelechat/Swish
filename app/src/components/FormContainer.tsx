/* eslint-disable tailwindcss/classnames-order */
"use client";

import useGameStore from "@/lib/store/game.store";
import GameForm from "./GameForm";

interface IFormContainerProps {
  gamesId: string[];
}

const FormContainer = ({ gamesId }: IFormContainerProps) => {
  const game = useGameStore((s) => s.game);

  if (game) {
    return <></>;
  }

  return (
    <div className="flex size-full items-center justify-center gap-8">
      <div className="flex h-full w-1/3 flex-col gap-6">
        <GameForm gamesId={gamesId} />
        <div
          className={`bg-secondary h-full overflow-scroll p-4 ${
            game
              ? ""
              : "text-primary flex items-center justify-center text-xl font-bold"
          }`}
        >
          <pre>{game ? JSON.stringify(game, null, 4) : "Non défini"}</pre>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
