"use client";

import useGameStore from "@/lib/store/game.store";
import { Repeat } from "lucide-react";
import { Button } from "./ui/button";

const Reset = () => {
  const resetGame = useGameStore((s) => s.resetGame);

  return (
    <Button variant="outline" size="icon" onClick={resetGame}>
      <Repeat className="size-4" />
    </Button>
  );
};

export default Reset;
