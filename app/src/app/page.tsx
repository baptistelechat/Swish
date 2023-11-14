import FormContainer from "@/components/FormContainer";
import getGamesIdBeforeToday from "@/lib/notion/getGamesIdBeforeToday";

const Home = async () => {
  const gamesId = (await getGamesIdBeforeToday()) as any[];

  return (
    <main className="w-screen h-screen p-8 justify-center">
      <FormContainer gamesId={gamesId} />
    </main>
  );
};

export default Home;
