"use client";

import { type StaffBasicInfo } from "@/types/staff";
import {
  affiliationOptions,
  basicOccupationOptions,
  resignationReasonOptions,
  transportationOptions,
} from "@/options/worker-system/options";

interface BasicInfoSectionProps {
  data: StaffBasicInfo;
  onChange: (data: Partial<StaffBasicInfo>) => void;
}

export function BasicInfoSection({ data, onChange }: BasicInfoSectionProps) {
  const inputClassName =
    "rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-gray-900 placeholder:text-gray-500 px-3 py-2";

  function handleChange(field: keyof StaffBasicInfo, value: string | number) {
    onChange({ [field]: value });
  }

  return (
    <section>
      <h2 className="text-lg font-medium text-gray-900 mb-4">基本情報</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-700">職員番号</label>
          <input
            type="text"
            className={`w-32 ${inputClassName}`}
            maxLength={4}
            value={data.workerId}
            onChange={(e) => handleChange("workerId", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-700">名前</label>
          <input
            type="text"
            className={`flex-1 ${inputClassName}`}
            placeholder="名前"
            maxLength={25}
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <input
            type="text"
            className={`flex-1 ${inputClassName}`}
            placeholder="フリガナ"
            maxLength={50}
            value={data.ruby}
            onChange={(e) => handleChange("ruby", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-700">生年月日</label>
          <input
            type="date"
            className={`w-40 ${inputClassName}`}
            value={data.birth}
            onChange={(e) => handleChange("birth", e.target.value)}
          />
          <label className="w-24 text-sm text-gray-700">性別</label>
          <select
            className={`w-32 ${inputClassName}`}
            value={data.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
          >
            <option value="">未選択</option>
            <option value="男性">男性</option>
            <option value="女性">女性</option>
          </select>
          <label className="w-24 text-sm text-gray-700">電話番号</label>
          <input
            type="tel"
            className={`w-48 ${inputClassName}`}
            value={data.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-700">郵便番号</label>
          <input
            type="text"
            className={`w-32 ${inputClassName}`}
            maxLength={7}
            value={data.zipCode}
            onChange={(e) => handleChange("zipCode", e.target.value)}
          />
          <label className="w-24 text-sm text-gray-700">住所</label>
          <input
            type="text"
            className={`flex-1 ${inputClassName}`}
            maxLength={100}
            value={data.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-700">所属</label>
          <select
            className={`w-48 ${inputClassName}`}
            value={data.affiliation}
            onChange={(e) => handleChange("affiliation", e.target.value)}
          >
            <option value="">未選択</option>
            {affiliationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <label className="w-24 text-sm text-gray-700">職種</label>
          <select
            className={`w-48 ${inputClassName}`}
            value={data.occupation}
            onChange={(e) => handleChange("occupation", e.target.value)}
          >
            <option value="">未選択</option>
            {basicOccupationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-700">入社日</label>
          <input
            type="date"
            className={`w-40 ${inputClassName}`}
            value={data.enrollmentAt}
            onChange={(e) => handleChange("enrollmentAt", e.target.value)}
          />
          <label className="w-24 text-sm text-gray-700">退職日</label>
          <input
            type="date"
            className={`w-40 ${inputClassName}`}
            value={data.resignationAt}
            onChange={(e) => handleChange("resignationAt", e.target.value)}
          />
          <label className="w-24 text-sm text-gray-700">退職理由</label>
          <select
            className={`w-48 ${inputClassName}`}
            value={data.resignationReason}
            onChange={(e) => handleChange("resignationReason", e.target.value)}
          >
            <option value="">未選択</option>
            {resignationReasonOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-700">交通費</label>
          <input
            type="number"
            className={`w-32 ${inputClassName}`}
            max={99999}
            value={data.commutingAllowance}
            onChange={(e) => handleChange("commutingAllowance", Number(e.target.value))}
          />
          <label className="w-24 text-sm text-gray-700">交通手段</label>
          <select
            className={`w-48 ${inputClassName}`}
            value={data.meansOfTransportation}
            onChange={(e) => handleChange("meansOfTransportation", e.target.value)}
          >
            <option value="">未選択</option>
            {transportationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <label className="w-24 text-sm text-gray-700">片道距離</label>
          <input
            type="number"
            step="0.1"
            max={100}
            className={`w-32 ${inputClassName}`}
            value={data.oneWayDistance}
            onChange={(e) => handleChange("oneWayDistance", Number(e.target.value))}
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-700">扶養控除</label>
          <select
            className={`w-32 ${inputClassName}`}
            value={
              data.dependentDeducationFlg
                ? "true"
                : data.dependentDeducationFlg === false
                ? "false"
                : ""
            }
            onChange={(e) => handleChange("dependentDeducationFlg", e.target.value)}
          >
            <option value="">未選択</option>
            <option value="true">甲</option>
            <option value="false">乙</option>
          </select>
          <label className="w-24 text-sm text-gray-700">扶養人数</label>
          <input
            type="number"
            className={`w-32 ${inputClassName}`}
            max={10}
            value={data.numberOfDependents}
            onChange={(e) => handleChange("numberOfDependents", Number(e.target.value))}
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-700">雇用保険</label>
          <select
            className={`w-48 ${inputClassName}`}
            value={
              data.unemployeeInsuranceFlg
                ? "true"
                : data.unemployeeInsuranceFlg === false
                ? "false"
                : ""
            }
            onChange={(e) => handleChange("unemployeeInsuranceFlg", e.target.value)}
          >
            <option value="">未選択</option>
            <option value="true">加入</option>
            <option value="false">未加入</option>
          </select>
          <label className="w-24 text-sm text-gray-700">社会保険</label>
          <select
            className={`w-48 ${inputClassName}`}
            value={
              data.socialInsuranceFlg ? "true" : data.socialInsuranceFlg === false ? "false" : ""
            }
            onChange={(e) => handleChange("socialInsuranceFlg", e.target.value)}
          >
            <option value="">未選択</option>
            <option value="true">加入</option>
            <option value="false">未加入</option>
          </select>
        </div>
        <div className="flex items-start gap-4">
          <label className="w-24 text-sm text-gray-700 pt-2">備考</label>
          <textarea
            className={`flex-1 ${inputClassName}`}
            rows={4}
            maxLength={100}
            value={data.remarks}
            onChange={(e) => handleChange("remarks", e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
