// Client Components (CSR)
// 要使用用戶端元件，你可以在文件頂部添加 React 的 “use client” 指令，在你的導入上方。
// 這樣的話，這個檔案就會被視為用戶端元件，並且只會在瀏覽器中執行。
"use client";
import { useEffect, useState } from "react";

const CSRPage = () => {
  const [data, setData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8); // 初始顯示 8 張卡片

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/rayc2045/pokedex/main/data/PokeApi.json"
        );
        const jsonData = await response.json();
        setData(jsonData); // 將獲取到的資料設置到狀態中
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8); // 每次增加 8 張卡片
  };

  return (
    <div className="container mx-auto px-2 py-8">
      <h1 className="text-2xl font-bold text-center">
        CSR (Client Side Rendering)
      </h1>
      {data.length === 0 ? (
        <p className="loading text-3xl">載入中...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {data.slice(0, visibleCount).map(
            (
              item // 根據 visibleCount 顯示卡片
            ) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 shadow-md text-center"
              >
                <h2 className="text-xl font-semibold">{item.name.en}</h2>
                <p className="text-gray-600">{item.genera.en}</p>
                <p className="text-gray-500">
                  類型: {item.types.en.join(", ")}
                </p>
                <p className="text-gray-400">描述: {item.entries.en[0]}</p>{" "}
                {/* 顯示第一條描述 */}
              </div>
            )
          )}
        </div>
      )}
      {visibleCount < data.length && (
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            顯示更多
          </button>
        </div>
      )}
    </div>
  );
};

export default CSRPage;
