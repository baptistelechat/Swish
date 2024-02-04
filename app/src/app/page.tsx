import CurrentGameBoard from "@/components/CurrentGameBoard";
import FormContainer from "@/components/FormContainer";
import GenerateImage from "@/components/GenerateImage";
import getGamesIdBeforeToday from "@/lib/notion/getGamesIdBeforeToday";
import { Suspense } from "react";

const Home = async () => {
  const gamesId = (await getGamesIdBeforeToday()) as any[];

  return (
    <main className="size-screen flex flex-col items-center gap-4 p-8">
      <Suspense fallback={"Load Games Id..."}>
        <FormContainer gamesId={gamesId} />
      </Suspense>
      <CurrentGameBoard />
      <GenerateImage />
    </main>
  );
};

export default Home;
