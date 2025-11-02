import React from "react";
import { usePathname } from "next/navigation";
import * as supportManualContent from "../../utility/supportManual";

interface SupportManualProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportManual({ isOpen, onClose }: SupportManualProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  // パスに基づいて適切なコンテンツを選択
  const getContent = () => {
    if (pathname.includes("/nursery/admin")) {
      return supportManualContent.admin();
    } else if (pathname.includes("/nursery/child-list")) {
      return supportManualContent.childList();
    } else if (pathname.includes("/nursery/child-register")) {
      return supportManualContent.childRegister();
    } else if (pathname.includes("/nursery/settings")) {
      return supportManualContent.settings();
    } else {
      // デフォルトのコンテンツ
      return (
        <div className="space-y-4 text-gray-700">
          <h3 className="text-xl font-bold text-gray-800 mb-4">使い方ガイド</h3>

          <section>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">基本操作</h4>
            <p className="text-sm leading-relaxed">
              このアプリケーションでは、園児の登録、出欠管理、健康チェックなどの機能を利用できます。
              各画面の操作方法について詳しく説明します。
            </p>
          </section>

          <section>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">園児登録</h4>
            <p className="text-sm leading-relaxed">
              園児登録画面では、新しい園児の情報を入力して登録できます。
              園児番号、名前、クラス、入園日などの情報を入力してください。
            </p>
          </section>

          <section>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">出欠管理</h4>
            <p className="text-sm leading-relaxed">
              出欠管理画面では、園児の出席状況を記録できます。
              欠席理由や体調不良の有無なども記録できます。
            </p>
          </section>

          <section>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">健康チェック</h4>
            <p className="text-sm leading-relaxed">
              健康チェック画面では、園児の体調や健康状態を記録できます。
              体温や体調不良の症状などを記録してください。
            </p>
          </section>

          <section>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">設定</h4>
            <p className="text-sm leading-relaxed">
              設定画面では、アプリケーションの表示設定や年次更新などの管理機能を利用できます。
              園の管理者のみがアクセスできます。
            </p>
          </section>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur bg-opacity-50 z-50">
      {/* すりガラス効果のある背景 */}
      <div className="absolute inset-0 backdrop-blur-sm bg-opacity-10"></div>

      {/* メインコンテンツ */}
      <div className="relative w-full h-full flex items-center justify-center p-4 overflow-y-auto">
        {/* 中央のコンテンツエリア */}
        <div className="w-full max-w-2xl max-h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* ヘッダー部分 */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">サポートマニュアル</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* スクロール可能なコンテンツ */}
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">{getContent()}</div>
        </div>
      </div>
    </div>
  );
}
