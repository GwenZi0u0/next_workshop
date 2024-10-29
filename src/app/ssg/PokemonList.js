"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PokemonList({ initialData, fetchInfo }) {
  const [visibleCount, setVisibleCount] = useState(8);
  const [currentTime, setCurrentTime] = useState(fetchInfo.lastUpdate);

  // 只在客戶端首次渲染時更新時間
  useEffect(() => {
    setCurrentTime(new Date().toLocaleString());
  }, []);

  return (
    <div className="space-y-6">
      {/* 渲染時間信息 */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="mb-2 text-xl">
          頁面渲染時間：<strong>{currentTime}</strong>
        </p>
        <p className="mb-2 text-xl">
          數據最後更新：<strong>{fetchInfo.lastUpdate}</strong>
        </p>
        <p className="mb-2 text-xl">
          數據獲取耗時：<strong>{fetchInfo.fetchTime}ms</strong>
        </p>
      </div>
      {/* Pokemon列表 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {initialData.slice(0, visibleCount).map((pokemon) => (
          <div
            key={pokemon.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{pokemon.name.en}</h2>
            <p className="text-gray-600 mb-2">{pokemon.genera.en}</p>
            <p className="text-gray-500 mb-2">
              類型: {pokemon.types.en.join(", ")}
            </p>
            <Link
              href={`/ssg/${pokemon.id}`}
              className="text-blue-500 hover:text-blue-700 inline-block mt-2"
            >
              查看詳情 →
            </Link>
          </div>
        ))}
      </div>

      {visibleCount < initialData.length && (
        <div className="text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 8)}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            顯示更多 ({initialData.length - visibleCount} 個剩餘)
          </button>
        </div>
      )}
    </div>
  );
}
