// Static Site Generation (SSG)
// Static Rendering (Default) 靜態渲染 （預設）
// 1.頁面在建置時生成（npm run build）
// 2.生成後的 HTML 可以被 CDN 快取
// 3.每個使用者看到的內容都是一樣的
// 4.頁面載入速度非常快
// 5.適合內容不常變更的頁面

import PokemonList from "./PokemonList";

// 靜態渲染加上重新驗證（ISR）
// 設定重新驗證時間
// export const revalidate = 3600; // 每小時重新生成一次

export const metadata = {
  title: "Static Site Generation",
  description: "This page demonstrates SSG in Next.js 14",
};

async function getData() {
  try {
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

    return {
      data,
      fetchInfo: {
        fetchTime: endTime - startTime,
        lastUpdate: endTime.toLocaleString(),
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      data: [],
      fetchInfo: {
        fetchTime: 0,
        lastUpdate: new Date().toLocaleString(),
      },
    };
  }
}

// 這個頁面會在建置時產生靜態 HTML
export default async function SSGPage() {
  const { data, fetchInfo } = await getData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center">
        Static Pokemon List (SSG)
      </h1>
      <PokemonList initialData={data} fetchInfo={fetchInfo} />
    </div>
  );
}
