"use client";

import { useState } from "react";

type ScheduleRecord = {
  id: number;
  changeDate: string;
  employeeId: string;
  name: string;
  changeType: "基本情報" | "給与情報" | "所属情報";
  changeContent: string;
  status: "予約中" | "承認済" | "否認" | "取下げ";
};

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<ScheduleRecord[]>([
    {
      id: 1,
      changeDate: "2024-04-01",
      employeeId: "E001",
      name: "山田太郎",
      changeType: "所属情報",
      changeContent: "部署異動：総務部 → 人事部",
      status: "予約中",
    },
    {
      id: 2,
      changeDate: "2024-04-01",
      employeeId: "E002",
      name: "鈴木花子",
      changeType: "給与情報",
      changeContent: "基本給変更：280,000円 → 300,000円",
      status: "承認済",
    },
    {
      id: 3,
      changeDate: "2024-03-31",
      employeeId: "E003",
      name: "佐藤次郎",
      changeType: "基本情報",
      changeContent: "住所変更",
      status: "予約中",
    },
  ]);

  const [selectedSchedules, setSelectedSchedules] = useState<number[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState<string>("");

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedSchedules(schedules.map((schedule) => schedule.id));
    } else {
      setSelectedSchedules([]);
    }
  };

  const handleSelectSchedule = (id: number) => {
    setSelectedSchedules((prev) => {
      if (prev.includes(id)) {
        return prev.filter((scheduleId) => scheduleId !== id);
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
    console.log("削除処理:", selectedSchedules);
  };

  const filteredSchedules = schedules.filter(
    (schedule) =>
      schedule.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (searchType === "" || schedule.changeType === searchType)
  );

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center gap-8 mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">名前</label>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="名前で検索"
              className="w-64 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">変更区分</label>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-64 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            >
              <option value="">すべて</option>
              <option value="基本情報">基本情報</option>
              <option value="給与情報">給与情報</option>
              <option value="所属情報">所属情報</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">変更予約</h1>
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
                  checked={selectedSchedules.length === schedules.length}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">変更日</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">職員番号</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">氏名</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">変更区分</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">変更内容</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">状態</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredSchedules.map((schedule) => (
              <tr key={schedule.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedSchedules.includes(schedule.id)}
                    onChange={() => handleSelectSchedule(schedule.id)}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                  {schedule.changeDate}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{schedule.employeeId}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{schedule.name}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{schedule.changeType}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{schedule.changeContent}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      schedule.status === "予約中"
                        ? "bg-blue-100 text-blue-800"
                        : schedule.status === "承認済"
                        ? "bg-green-100 text-green-800"
                        : schedule.status === "否認"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {schedule.status}
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
