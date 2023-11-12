import Menu from "@/components/Menu";

export default function Home() {
  return (
    <main className="w-screen h-screen p-2 flex justify-center items-center">
      <div className="flex gap-2">
        <Menu />
        <Menu />
      </div>
    </main>
  );
}
