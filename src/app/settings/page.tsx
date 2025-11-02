"use client";

import { useState } from "react";

type MasterSetting = {
  id: number;
  code: string;
  name: string;
  value: string;
  description: string;
};

const masterTables = [
  { value: "system", label: "システムマスタ" },
  { value: "employee", label: "職員マスタ" },
  { value: "department", label: "部署マスタ" },
  { value: "position", label: "役職マスタ" },
  { value: "salary", label: "給与マスタ" },
] as const;

export default function SettingsPage() {
  const [selectedTable, setSelectedTable] = useState("system");
  const [settings, setSettings] = useState<MasterSetting[]>([
    {
      id: 1,
      code: "BACKUP_TIME",
      name: "バックアップ時刻",
      value: "03:00",
      description: "日次バックアップの実行時刻",
    },
    {
      id: 2,
      code: "RETENTION_DAYS",
      name: "保存期間",
      value: "90",
      description: "バックアップデータの保存期間（日）",
    },
    {
      id: 3,
      code: "MAIL_FROM",
      name: "送信元アドレス",
      value: "no-reply@example.com",
      description: "システムメールの送信元アドレス",
    },
  ]);

  const [selectedSettings, setSelectedSettings] = useState<number[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedSettings(settings.map((setting) => setting.id));
    } else {
      setSelectedSettings([]);
    }
  };

  const handleSelectSetting = (id: number) => {
    setSelectedSettings((prev) => {
      if (prev.includes(id)) {
        return prev.filter((settingId) => settingId !== id);
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
    console.log("削除処理:", selectedSettings);
  };

  const handleChange = (id: number, field: keyof MasterSetting, value: string) => {
    setSettings((prev) =>
      prev.map((setting) => (setting.id === id ? { ...setting, [field]: value } : setting))
    );
  };

  const handleTableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTable(e.target.value);
    // ここで選択されたマスタテーブルに応じてデータを取得する処理を実装
    console.log("選択されたマスタ:", e.target.value);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-6">
          <label className="text-sm font-medium text-gray-700">マスタ種類</label>
          <select
            value={selectedTable}
            onChange={handleTableChange}
            className="w-64 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
          >
            {masterTables.map((table) => (
              <option key={table.value} value={table.value}>
                {table.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">マスタ設定</h1>
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
                  checked={selectedSettings.length === settings.length}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
              </th>
              <th className="w-16 px-4 py-3 text-left text-sm font-medium text-gray-700">No.</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">コード</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">名称</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">値</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">説明</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {settings.map((setting) => (
              <tr key={setting.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedSettings.includes(setting.id)}
                    onChange={() => handleSelectSetting(setting.id)}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{setting.id}</td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={setting.code}
                    onChange={(e) => handleChange(setting.id, "code", e.target.value)}
                    className="w-full border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={setting.name}
                    onChange={(e) => handleChange(setting.id, "name", e.target.value)}
                    className="w-full border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={setting.value}
                    onChange={(e) => handleChange(setting.id, "value", e.target.value)}
                    className="w-full border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={setting.description}
                    onChange={(e) => handleChange(setting.id, "description", e.target.value)}
                    className="w-full border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </td>
              </tr>
            ))}
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3 text-sm text-gray-900"></td>
              <td className="px-4 py-3">
                <input
                  type="text"
                  placeholder="新規コード"
                  className="w-full border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </td>
              <td className="px-4 py-3">
                <input
                  type="text"
                  placeholder="新規名称"
                  className="w-full border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </td>
              <td className="px-4 py-3">
                <input
                  type="text"
                  placeholder="新規値"
                  className="w-full border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </td>
              <td className="px-4 py-3">
                <input
                  type="text"
                  placeholder="新規説明"
                  className="w-full border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
