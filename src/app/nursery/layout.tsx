"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, Suspense } from "react";
import { FaHome } from "react-icons/fa";

function NurseryLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const pressTimer = useRef<NodeJS.Timeout | undefined>(undefined);
  const PRESS_DURATION = 1000; // 1秒間の長押しで遷移

  const handlePressStart = () => {
    pressTimer.current = setTimeout(() => {
      const targetPath = pathname === "/nursery/admin" ? "/nursery" : "/nursery/admin";
      router.push(targetPath);
    }, PRESS_DURATION);
  };

  const handlePressEnd = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
    }
  };

  const handleHome = () => {
    if (mode === "absence" || pathname !== "/nursery/child-condition") {
      router.replace("/nursery/admin");
    } else {
      router.replace("/nursery");
    }
  };

  // コンポーネントのアンマウント時にタイマーをクリア
  useEffect(() => {
    return () => {
      if (pressTimer.current) {
        clearTimeout(pressTimer.current);
      }
    };
  }, []);

  const getPageTitle = () => {
    if (pathname === "/nursery") return "登降園管理";
    if (pathname === "/nursery/admin") return "管理画面";
    if (pathname === "/nursery/settings") return "設定";
    return "登降園管理システム";
  };

  const getHeaderColor = () => {
    if (pathname === "/nursery" || (pathname === "/nursery/child-condition" && mode !== "absence")) {
      return "bg-orange-500";
    }
    return "bg-violet-500";
  };

  const showHomeIcon = !["/nursery", "/nursery/admin"].includes(pathname);

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <header className={`fixed w-full top-0 z-50 ${getHeaderColor()}`}>
        <div className="h-16 px-4 flex items-center justify-between relative">
          <div className="w-10 h-10"></div>

          {/* 中央のタイトル */}
          <h1 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold">{getPageTitle()}</h1>

          {/* 右側のアイコン */}
          <div>
            {showHomeIcon ? (
              <button onClick={handleHome} className="text-white p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="ホームへ戻る">
                <FaHome className="text-2xl" />
              </button>
            ) : (
              <button
                onTouchStart={handlePressStart}
                onTouchEnd={handlePressEnd}
                onMouseDown={handlePressStart}
                onMouseUp={handlePressEnd}
                onMouseLeave={handlePressEnd}
                className="w-10 h-10 rounded-md"
                aria-label="画面切替"
              />
            )}
          </div>
        </div>
      </header>

      <div className="">{children}</div>
    </div>
  );
}

export default function NurseryLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NurseryLayoutContent>{children}</NurseryLayoutContent>
    </Suspense>
  );
}
