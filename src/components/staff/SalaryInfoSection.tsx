"use client";

import { type StaffSalaryInfo } from "@/types/staff";
import {
  licenseOptions,
  areaOptions,
  typeOptions,
  postOptions,
  gradeOptions,
  evaluationOptions,
} from "@/options/worker-system/options";

interface SalaryInfoSectionProps {
  data: StaffSalaryInfo;
  onChange: (data: Partial<StaffSalaryInfo>) => void;
}

export function SalaryInfoSection({ data, onChange }: SalaryInfoSectionProps) {
  const inputClassName =
    "rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-gray-900 placeholder:text-gray-500 px-3 py-2";

  function handleStringChange<K extends keyof StaffSalaryInfo>(field: K, value: string) {
    if (typeof data[field] === "string") {
      onChange({ [field]: value } as Pick<StaffSalaryInfo, K>);
    }
  }

  function handleNumberChange<K extends keyof StaffSalaryInfo>(field: K, value: string) {
    if (typeof data[field] === "number") {
      onChange({ [field]: Number(value) } as Pick<StaffSalaryInfo, K>);
    }
  }

  function handleRegularSalaryChange(field: keyof StaffSalaryInfo["regularSalary"], value: string) {
    onChange({
      regularSalary: {
        ...data.regularSalary,
        [field]: Number(value),
      },
    });
  }

  function handlePartTimeSalaryChange(
    field: keyof StaffSalaryInfo["partTimeSalary"],
    value: string
  ) {
    onChange({
      partTimeSalary: {
        ...data.partTimeSalary,
        [field]: Number(value),
      },
    });
  }

  function handleEvaluationChange(field: keyof StaffSalaryInfo["evaluation"], value: string) {
    onChange({
      evaluation: {
        ...data.evaluation,
        [field]: value,
      },
    });
  }

  function handleDiverseWorkOptionChange(field: keyof StaffSalaryInfo["diverseWorkOptions"]) {
    onChange({
      diverseWorkOptions: {
        ...data.diverseWorkOptions,
        [field]: !data.diverseWorkOptions[field],
      },
    });
  }

  return (
    <section>
      <h2 className="text-lg font-medium text-gray-900 mb-4">給与情報</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-700">資格</label>
          <select
            className={`w-48 ${inputClassName}`}
            value={data.qualification}
            onChange={(e) => handleStringChange("qualification", e.target.value)}
          >
            <option value="">未選択</option>
            {licenseOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-700">エリア</label>
          <select
            className={`w-48 ${inputClassName}`}
            value={data.area}
            onChange={(e) => handleStringChange("area", e.target.value)}
          >
            <option value="">未選択</option>
            {areaOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-700">雇用形態</label>
          <select
            className={`w-48 ${inputClassName}`}
            value={data.type}
            onChange={(e) => handleStringChange("type", e.target.value)}
          >
            <option value="">未選択</option>
            {typeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-700">役職</label>
          <select
            className={`w-48 ${inputClassName}`}
            value={data.post}
            onChange={(e) => handleStringChange("post", e.target.value)}
          >
            <option value="">未選択</option>
            {postOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-700">等級</label>
          <select
            className={`w-48 ${inputClassName}`}
            value={data.grade}
            onChange={(e) => handleNumberChange("grade", e.target.value)}
          >
            <option value="0">未選択</option>
            {gradeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-700">所定日数</label>
          <input
            type="number"
            min={1}
            max={5}
            className={`w-32 ${inputClassName}`}
            value={data.workingDays}
            onChange={(e) => handleNumberChange("workingDays", e.target.value)}
          />
          <label className="w-24 text-sm text-gray-700">所定時間</label>
          <input
            type="number"
            min={1}
            max={10}
            className={`w-32 ${inputClassName}`}
            value={data.workingHour}
            onChange={(e) => handleNumberChange("workingHour", e.target.value)}
          />
        </div>

        {/* 多様な正社員オプション */}
        {data.type === "多様な正社員" && (
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">多様な正社員オプション</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  checked={data.diverseWorkOptions.requestedDayoff}
                  onChange={() => handleDiverseWorkOptionChange("requestedDayoff")}
                />
                <label className="ml-2 text-sm text-gray-700">希望休増加</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  checked={data.diverseWorkOptions.earlyShift}
                  onChange={() => handleDiverseWorkOptionChange("earlyShift")}
                />
                <label className="ml-2 text-sm text-gray-700">早番免除</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  checked={data.diverseWorkOptions.lateShift}
                  onChange={() => handleDiverseWorkOptionChange("lateShift")}
                />
                <label className="ml-2 text-sm text-gray-700">遅番免除</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  checked={data.diverseWorkOptions.saturdayDayoff}
                  onChange={() => handleDiverseWorkOptionChange("saturdayDayoff")}
                />
                <label className="ml-2 text-sm text-gray-700">土曜日出勤免除</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  checked={data.diverseWorkOptions.existingTransfar}
                  onChange={() => handleDiverseWorkOptionChange("existingTransfar")}
                />
                <label className="ml-2 text-sm text-gray-700">既存園への転勤免除</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  checked={data.diverseWorkOptions.newTransfar}
                  onChange={() => handleDiverseWorkOptionChange("newTransfar")}
                />
                <label className="ml-2 text-sm text-gray-700">新規園への転勤免除</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  checked={data.diverseWorkOptions.summerVacation}
                  onChange={() => handleDiverseWorkOptionChange("summerVacation")}
                />
                <label className="ml-2 text-sm text-gray-700">夏季休暇申請</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  checked={data.diverseWorkOptions.newYearVacation}
                  onChange={() => handleDiverseWorkOptionChange("newYearVacation")}
                />
                <label className="ml-2 text-sm text-gray-700">年始休暇申請</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  checked={data.diverseWorkOptions.yearEndVacation}
                  onChange={() => handleDiverseWorkOptionChange("yearEndVacation")}
                />
                <label className="ml-2 text-sm text-gray-700">年末休暇申請</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  checked={data.diverseWorkOptions.startFiscalYearVacation}
                  onChange={() => handleDiverseWorkOptionChange("startFiscalYearVacation")}
                />
                <label className="ml-2 text-sm text-gray-700">年度初め休暇申請</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  checked={data.diverseWorkOptions.endFiscalYearVacation}
                  onChange={() => handleDiverseWorkOptionChange("endFiscalYearVacation")}
                />
                <label className="ml-2 text-sm text-gray-700">年度末休暇申請</label>
              </div>
            </div>
          </div>
        )}

        {/* 正社員給与情報 */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-900 mb-4">正社員</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">月給</label>
              <input
                type="number"
                className={`w-full ${inputClassName}`}
                value={data.regularSalary.salary}
                onChange={(e) => handleRegularSalaryChange("salary", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">基本給</label>
              <input
                type="number"
                className={`w-full ${inputClassName}`}
                value={data.regularSalary.basicSalary}
                onChange={(e) => handleRegularSalaryChange("basicSalary", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">資格手当</label>
              <input
                type="number"
                className={`w-full ${inputClassName}`}
                value={data.regularSalary.qualificationAllowance}
                onChange={(e) =>
                  handleRegularSalaryChange("qualificationAllowance", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">地域手当</label>
              <input
                type="number"
                className={`w-full ${inputClassName}`}
                value={data.regularSalary.areaAllowance}
                onChange={(e) => handleRegularSalaryChange("areaAllowance", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">役職手当</label>
              <input
                type="number"
                className={`w-full ${inputClassName}`}
                value={data.regularSalary.postAllowance}
                onChange={(e) => handleRegularSalaryChange("postAllowance", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">調整手当</label>
              <input
                type="number"
                className={`w-full ${inputClassName}`}
                value={data.regularSalary.adjustmentAllowance}
                onChange={(e) => handleRegularSalaryChange("adjustmentAllowance", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* パート給与情報 */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-900 mb-4">パート</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">時給</label>
              <input
                type="number"
                className={`w-full ${inputClassName}`}
                value={data.partTimeSalary.hourlyWage}
                onChange={(e) => handlePartTimeSalaryChange("hourlyWage", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">資格給</label>
              <input
                type="number"
                className={`w-full ${inputClassName}`}
                value={data.partTimeSalary.qualificationWage}
                onChange={(e) => handlePartTimeSalaryChange("qualificationWage", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">在籍給</label>
              <input
                type="number"
                className={`w-full ${inputClassName}`}
                value={data.partTimeSalary.enrollmentWage}
                onChange={(e) => handlePartTimeSalaryChange("enrollmentWage", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">地域給</label>
              <input
                type="number"
                className={`w-full ${inputClassName}`}
                value={data.partTimeSalary.areaWage}
                onChange={(e) => handlePartTimeSalaryChange("areaWage", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">能力給</label>
              <input
                type="number"
                className={`w-full ${inputClassName}`}
                value={data.partTimeSalary.evaluationWage}
                onChange={(e) => handlePartTimeSalaryChange("evaluationWage", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">調整給</label>
              <input
                type="number"
                className={`w-full ${inputClassName}`}
                value={data.partTimeSalary.adjustmentWage}
                onChange={(e) => handlePartTimeSalaryChange("adjustmentWage", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 人事考課 */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-900 mb-4">人事考課</h3>
          <div className="flex items-center gap-4">
            <label className="w-24 text-sm text-gray-700">夏</label>
            <select
              className={`w-48 ${inputClassName}`}
              value={data.evaluation.summerEvaluation}
              onChange={(e) => handleEvaluationChange("summerEvaluation", e.target.value)}
            >
              <option value="">未選択</option>
              {evaluationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <label className="w-24 text-sm text-gray-700">冬</label>
            <select
              className={`w-48 ${inputClassName}`}
              value={data.evaluation.winterEvaluation}
              onChange={(e) => handleEvaluationChange("winterEvaluation", e.target.value)}
            >
              <option value="">未選択</option>
              {evaluationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
