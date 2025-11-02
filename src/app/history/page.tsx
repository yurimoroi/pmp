"use client";

import { useState } from "react";

type OperationHistory = {
  id: number;
  timestamp: string;
  operator: string;
  screenName: string;
  operation: string;
  process1: string;
  process2: string;
  process3: string;
  process4: string;
};

export default function HistoryPage() {
  const [histories, setHistories] = useState<OperationHistory[]>([
    {
      id: 1,
      timestamp: "2024-03-15 14:30:25",
      operator: "山田太郎",
      screenName: "職員情報",
      operation: "職員情報の更新",
      process1: "基本情報更新",
      process2: "給与情報更新",
      process3: "",
      process4: "",
    },
    {
      id: 2,
      timestamp: "2024-03-15 13:45:12",
      operator: "鈴木花子",
      screenName: "印刷",
      operation: "帳票出力",
      process1: "労働者名簿",
      process2: "PDF出力",
      process3: "印刷完了",
      process4: "",
    },
    {
      id: 3,
      timestamp: "2024-03-15 11:20:05",
      operator: "佐藤次郎",
      screenName: "設定",
      operation: "マスタ更新",
      process1: "部署マスタ",
      process2: "データ更新",
      process3: "バックアップ",
      process4: "完了",
    },
  ]);

  const [searchOperator, setSearchOperator] = useState("");
  const [searchScreen, setSearchScreen] = useState("");

  const filteredHistories = histories.filter(
    (history) =>
      history.operator.toLowerCase().includes(searchOperator.toLowerCase()) &&
      history.screenName.toLowerCase().includes(searchScreen.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center gap-8 mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">操作者</label>
            <input
              type="text"
              value={searchOperator}
              onChange={(e) => setSearchOperator(e.target.value)}
              placeholder="操作者で検索"
              className="w-64 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">画面名</label>
            <input
              type="text"
              value={searchScreen}
              onChange={(e) => setSearchScreen(e.target.value)}
              placeholder="画面名で検索"
              className="w-64 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">操作履歴</h1>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-orange-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">操作日時</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">操作者</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">画面名</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">操作内容</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">処理1</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">処理2</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">処理3</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">処理4</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredHistories.map((history) => (
              <tr key={history.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                  {history.timestamp}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{history.operator}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{history.screenName}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{history.operation}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{history.process1}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{history.process2}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{history.process3}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{history.process4}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
