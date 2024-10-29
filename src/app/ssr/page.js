// Server side render (SSR) 伺服器端渲染
//Dynamic Rendering 動態渲染
import PokemonList from "./PokemonList";

export const metadata = {
  title: "Dynamic Pokemon List",
  description: "This page demonstrates dynamic rendering in Next.js 14",
};

async function getData() {
  const startTime = new Date();
  const response = await fetch(
    "https://raw.githubusercontent.com/rayc2045/pokedex/main/data/PokeApi.json",
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  const endTime = new Date();
  const fetchTime = endTime - startTime;

  return {
    data,
    fetchInfo: {
      fetchTime,
      lastUpdate: endTime.toLocaleString(),
    },
  };
}

export default async function SSRPage() {
  const { data, fetchInfo } = await getData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center">
        Dynamic Pokemon List (SSR)
      </h1>
      <PokemonList initialData={data} fetchInfo={fetchInfo} />
    </div>
  );
}
