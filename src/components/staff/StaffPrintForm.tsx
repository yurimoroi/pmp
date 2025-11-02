"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface StaffPrintFormData {
  employeeNumber: string;
  name: string;
  documentType: string;
  trialPeriod: boolean;
  submissionDate: string;
  printType: "all" | "selected";
  printFormat: "pdf" | "excel";
  startDate?: string;
  endDate?: string;
}

export function StaffPrintForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<StaffPrintFormData>({
    employeeNumber: "",
    name: "",
    documentType: "",
    trialPeriod: false,
    submissionDate: "",
    printType: "selected",
    printFormat: "pdf",
  });

  const inputClassName =
    "rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-gray-900 placeholder:text-gray-500 px-3 py-2";

  function handleChange(field: keyof StaffPrintFormData, value: string | boolean) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: 印刷処理の実装
    console.log("印刷データ:", formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg p-6">
        {/* 印刷設定 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">印刷設定</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">印刷範囲</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    className="text-orange-500 focus:ring-orange-500"
                    checked={formData.printType === "selected"}
                    onChange={() => handleChange("printType", "selected")}
                  />
                  <span className="text-sm text-gray-700">選択した職員のみ</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    className="text-orange-500 focus:ring-orange-500"
                    checked={formData.printType === "all"}
                    onChange={() => handleChange("printType", "all")}
                  />
                  <span className="text-sm text-gray-700">全職員</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">出力形式</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    className="text-orange-500 focus:ring-orange-500"
                    checked={formData.printFormat === "pdf"}
                    onChange={() => handleChange("printFormat", "pdf")}
                  />
                  <span className="text-sm text-gray-700">PDF</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    className="text-orange-500 focus:ring-orange-500"
                    checked={formData.printFormat === "excel"}
                    onChange={() => handleChange("printFormat", "excel")}
                  />
                  <span className="text-sm text-gray-700">Excel</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* 書類選択 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">書類種別</label>
            <select
              className={`w-full ${inputClassName}`}
              value={formData.documentType}
              onChange={(e) => handleChange("documentType", e.target.value)}
              required
            >
              <option value="">未選択</option>
              <option value="labor_roster">労働者名簿</option>
              <option value="employment_contract">雇用契約書</option>
              <option value="salary_statement">給与明細書</option>
            </select>
          </div>

          {/* 提出年月日 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">提出年月日</label>
            <input
              type="date"
              className={`w-full ${inputClassName}`}
              value={formData.submissionDate}
              onChange={(e) => handleChange("submissionDate", e.target.value)}
              required
            />
          </div>

          {/* 職員番号 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">職員番号</label>
            <input
              type="text"
              className={`w-full ${inputClassName}`}
              value={formData.employeeNumber}
              onChange={(e) => handleChange("employeeNumber", e.target.value)}
              maxLength={4}
              placeholder="例: 1234"
            />
          </div>

          {/* 職員名 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">職員名</label>
            <input
              type="text"
              className={`w-full ${inputClassName}`}
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="例: 山田 太郎"
            />
          </div>

          {/* 対象期間（開始） */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">対象期間（開始）</label>
            <input
              type="date"
              className={`w-full ${inputClassName}`}
              value={formData.startDate || ""}
              onChange={(e) => handleChange("startDate", e.target.value)}
            />
          </div>

          {/* 対象期間（終了） */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">対象期間（終了）</label>
            <input
              type="date"
              className={`w-full ${inputClassName}`}
              value={formData.endDate || ""}
              onChange={(e) => handleChange("endDate", e.target.value)}
            />
          </div>
        </div>

        {/* お試し期間チェックボックス */}
        <div className="mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              checked={formData.trialPeriod}
              onChange={(e) => handleChange("trialPeriod", e.target.checked)}
            />
            <span className="text-sm text-gray-700">お試し期間</span>
          </label>
        </div>
      </div>

      {/* ボタングループ */}
      <div className="flex justify-center space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          戻る
        </button>
        <button
          type="submit"
          className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          作成
        </button>
      </div>
    </form>
  );
}
