"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { signOut } from "aws-amplify/auth";
import { useUser } from "@/context/userContext";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const router = useRouter();
  const { user, loading } = useUser();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("ログアウトに失敗しました:", error);
    }
  };

  return (
    <header className="bg-orange-500 fixed w-full top-0 z-50">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={onToggleSidebar} className="p-2 rounded-md text-orange-100 hover:bg-orange-600 hover:text-white focus:outline-none">
            <Bars3Icon className="h-6 w-6" />
          </button>
          <Link href="/" className="ml-4 text-white text-xl font-bold hover:text-orange-100 transition-colors">
            職員管理システム
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-orange-100">
            <div className="text-sm">{loading ? "読み込み中..." : user?.name ?? "ゲスト"}</div>
            <div className="text-xs opacity-75">{loading ? "読み込み中..." : user?.group ?? "権限なし"}</div>
          </div>
          <button onClick={handleLogout} className="px-4 py-2 text-sm text-orange-100 hover:bg-orange-600 hover:text-white rounded-md transition-colors cursor-pointer">
            ログアウト
          </button>
        </div>
      </div>
    </header>
  );
}
