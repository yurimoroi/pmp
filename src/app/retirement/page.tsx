"use client";

import { useState } from "react";

type RetirementRecord = {
  id: number;
  employeeId: string;
  name: string;
  department: string;
  position: string;
  joinDate: string;
  retirementDate: string;
  reason: string;
  status: "申請中" | "承認済" | "否認" | "取下げ";
};

export default function RetirementPage() {
  const [records, setRecords] = useState<RetirementRecord[]>([
    {
      id: 1,
      employeeId: "E001",
      name: "山田太郎",
      department: "総務部",
      position: "主任",
      joinDate: "2020-04-01",
      retirementDate: "2024-03-31",
      reason: "自己都合",
      status: "申請中",
    },
    {
      id: 2,
      employeeId: "E002",
      name: "鈴木花子",
      department: "人事部",
      position: "課長",
      joinDate: "2015-04-01",
      retirementDate: "2024-03-31",
      reason: "定年",
      status: "承認済",
    },
  ]);

  const [selectedRecords, setSelectedRecords] = useState<number[]>([]);
  const [searchName, setSearchName] = useState("");

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRecords(records.map((record) => record.id));
    } else {
      setSelectedRecords([]);
    }
  };

  const handleSelectRecord = (id: number) => {
    setSelectedRecords((prev) => {
      if (prev.includes(id)) {
        return prev.filter((recordId) => recordId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleRegister = () => {
    // 登録処理の実装
    console.log("登録処理");
  };

  const handleDelete = () => {
    // 削除処理の実装
    console.log("削除処理:", selectedRecords);
  };

  const filteredRecords = records.filter((record) =>
    record.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-6">
          <label className="text-sm font-medium text-gray-700">名前</label>
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="名前で検索"
            className="w-64 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">退職者制度</h1>
          <div className="space-x-4">
            <button
              onClick={handleRegister}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              登録
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              削除
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-orange-50">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRecords.length === records.length}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">職員番号</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">氏名</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">所属</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">役職</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">入職日</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">退職予定日</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">退職理由</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">状態</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRecords.includes(record.id)}
                    onChange={() => handleSelectRecord(record.id)}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{record.employeeId}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{record.name}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{record.department}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{record.position}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{record.joinDate}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{record.retirementDate}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{record.reason}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      record.status === "申請中"
                        ? "bg-blue-100 text-blue-800"
                        : record.status === "承認済"
                        ? "bg-green-100 text-green-800"
                        : record.status === "否認"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
