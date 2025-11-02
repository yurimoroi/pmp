"use client";

import { useState } from "react";

const documentTypes = [
  { value: "労働者名簿", label: "労働者名簿" },
  { value: "賃金台帳", label: "賃金台帳" },
  { value: "出勤簿", label: "出勤簿" },
  { value: "雇用契約書", label: "雇用契約書" },
];

export default function PrintPage() {
  const [selectedDocument, setSelectedDocument] = useState("");

  const handlePrint = () => {
    // 印刷処理の実装
    console.log("印刷処理:", selectedDocument);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">印刷</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          {/* 帳票選択 */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-gray-700">帳票種類</label>
            <select
              value={selectedDocument}
              onChange={(e) => setSelectedDocument(e.target.value)}
              className="flex-1 max-w-xs rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">選択してください</option>
              {documentTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* 職員番号 */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-gray-700">職員番号</label>
            <input
              type="text"
              className="flex-1 max-w-xs rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="職員番号を入力"
            />
          </div>

          {/* 氏名 */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-gray-700">氏名</label>
            <input
              type="text"
              className="flex-1 max-w-xs rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="氏名を入力"
            />
          </div>

          {/* 一括作成 */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-gray-700">一括作成</label>
            <select className="flex-1 max-w-xs rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <option value="">-</option>
              <option value="all">全職員</option>
              <option value="department">部署別</option>
            </select>
          </div>

          {/* 雇用年月日 */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-gray-700">雇用年月日</label>
            <input
              type="date"
              className="flex-1 max-w-xs rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {/* お試し期間 */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-gray-700">お試し期間</label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <span className="text-gray-700">あり</span>
            </div>
          </div>

          {/* 提出年月日 */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-gray-700">提出年月日</label>
            <input
              type="text"
              className="flex-1 max-w-xs rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="----年--月"
            />
          </div>
        </div>

        {/* 作成ボタン */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            作成
          </button>
        </div>
      </div>
    </div>
  );
}
