// Static Rendering (Default) 靜態渲染 （預設）
import Link from "next/link";
export const metadata = {
  title: "Pokemon Details",
  description: "Individual Pokemon details page in Next.js",
};

// 設定重新驗證時間，與列表頁保持一致
export const revalidate = 3600;

// 定義要靜態生成的路徑參數
export async function generateStaticParams() {
  const response = await fetch(
    "https://raw.githubusercontent.com/rayc2045/pokedex/main/data/PokeApi.json"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  // 提取所有寶可夢的 ID
  const params = data.map((pokemon) => ({ id: pokemon.id.toString() }));

  return params;
}

// 獲取單個寶可夢數據的函數
async function getData(id) {
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
  const pokemon = data.find((p) => p.id.toString() === id);

  if (!pokemon) {
    throw new Error("Pokemon not found");
  }

  return {
    pokemon,
    fetchInfo: {
      lastUpdate: new Date().toLocaleString(),
    },
  };
}

export default async function PokemonDetailPage({ params }) {
  const { id } = await params;
  const { pokemon, fetchInfo } = await getData(id);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg p-6 mt-20">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-4">
        <h1 className="text-3xl font-bold mb-4 text-center">
          {pokemon.name.en} ({pokemon.name.zh})
        </h1>

        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{pokemon.genera.en}</h2>
            <p className="text-gray-600">{pokemon.genera.zh}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">類型</h2>
            <div className="flex gap-2">
              {pokemon.types.en.map((type, index) => (
                <span
                  key={type}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  {type} ({pokemon.types.zh[index]})
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">描述</h2>
            <div className="space-y-2">
              {pokemon.entries.en.map((entry, index) => (
                <div
                  key={index}
                  className="border-b pb-2 last:border-b-0 last:pb-0"
                >
                  <p className="text-gray-800">{entry}</p>
                  <p className="text-gray-600 mt-1">
                    {pokemon.entries.zh[index]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-500 mt-4">
            最後更新時間：{fetchInfo.lastUpdate}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/ssg"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            ← 返回列表
          </Link>
        </div>
      </div>
    </div>
  );
}
