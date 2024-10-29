"use client";
//Client Component 負責狀態管理和事件處理
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PokemonList({ initialData, fetchInfo }) {
  const [visibleCount, setVisibleCount] = useState(8);
  const [currentTime, setCurrentTime] = useState("");
  const [timeSinceUpdate, setTimeSinceUpdate] = useState("");

  useEffect(() => {
    // 更新當前時間和計算時間差的函數
    const updateTimeSinceUpdate = () => {
      const now = new Date();
      const lastUpdate = new Date(fetchInfo.lastUpdate);
      const diff = now - lastUpdate;

      if (!isNaN(lastUpdate)) {
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        setTimeSinceUpdate(`${minutes}分 ${seconds}秒`);
      } else {
        setTimeSinceUpdate("無法計算時間差");
      }
    };

    // 更新當前時間的函數
    const updateCurrentTime = () => {
      setCurrentTime(new Date().toLocaleString()); // 每秒更新當前時間
    };

    // 初始更新
    updateTimeSinceUpdate();
    updateCurrentTime();

    const timer = setInterval(() => {
      updateCurrentTime(); // 每秒更新當前時間
      updateTimeSinceUpdate(); // 每秒更新時間差
    }, 1000);

    return () => clearInterval(timer);
  }, [fetchInfo.lastUpdate]);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div>
            <p className="mb-2 text-xl">
              頁面渲染時間：<strong className="text-2xl">{currentTime}</strong> {/* 當前時間 */}
            </p>
            <p className="mb-2 text-xl">
              數據獲取耗時：<strong>{fetchInfo.fetchTime}ms</strong>
            </p>
          </div>
          <div className="text-right">
            <p className="mb-2  text-xl">
              顯示: {visibleCount} / {initialData.length} 個寶可夢
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {initialData.slice(0, visibleCount).map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-xl font-semibold">{item.name.en}</h2>
            <p className="text-gray-600">{item.genera.en}</p>
            <p className="text-gray-500">類型: {item.types.en.join(", ")}</p>
            <p className="text-gray-400 line-clamp-2">
              描述: {item.entries.en[0]}
            </p>
            <Link
              href={`/ssr/${item.id}`}
              className="text-blue-500 hover:text-blue-700 inline-block mt-2 text-left"
            >
              查看詳情 →
            </Link>
          </div>
        ))}
      </div>

      {visibleCount < initialData.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
          >
            顯示更多 ({initialData.length - visibleCount} 個剩餘)
          </button>
        </div>
      )}
    </div>
  );
}
