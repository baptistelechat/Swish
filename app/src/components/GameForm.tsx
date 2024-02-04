"use client";
import getGameById from "@/lib/notion/getGameById";
import useGameStore from "@/lib/store/game.store";
import AutoForm, { AutoFormSubmit } from "@ui/auto-form";
import * as z from "zod";

interface IGameFormProps {
  gamesId: string[];
}

const GameForm = ({ gamesId }: IGameFormProps) => {
  const setGame = useGameStore((s) => s.setGame);

  // Define the form schema using zod
  const formSchema = z.object({
    // Enum will show a select
    game: z
      .enum(gamesId as [string, ...string[]], {
        required_error: "Game is required.",
      })
      .describe("Select a game."),
  });

  if (gamesId.length === 0) {
    return "Chargement ...";
  }

  return (
    <AutoForm
      // Pass the schema to the form
      formSchema={formSchema}
      // You can add additional config for each field
      // to customize the UI
      fieldConfig={{
        game: {
          description: "Select a game ID for get his data.",
        },
      }}
      onSubmit={async (data) => {
        const game = await getGameById(data.game);
        setGame(game);
      }}
    >
      {/* 
      Pass in a AutoFormSubmit or a button with type="submit".
      Alternatively, you can not pass a submit button
      to create auto-saving forms etc.
      */}
      <AutoFormSubmit>Generate image</AutoFormSubmit>
    </AutoForm>
  );
};

export default GameForm;
