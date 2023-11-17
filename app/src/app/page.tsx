import FormContainer from "@/components/FormContainer";
import getGamesIdBeforeToday from "@/lib/notion/getGamesIdBeforeToday";
import { Suspense } from "react";

const Home = async () => {
  const gamesId = (await getGamesIdBeforeToday()) as any[];

  return (
    <main className="w-screen h-screen p-8 justify-center">
      <Suspense fallback={"Load Games Id..."}>
        <FormContainer gamesId={gamesId} />
      </Suspense>
    </main>
  );
};

export default Home;
