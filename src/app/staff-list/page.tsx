"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { StaffInfoResponse } from "@/types/staff";

export default function StaffListPage() {
  const [staffList, setStaffList] = useState<StaffInfoResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const tableRef = useRef<HTMLDivElement>(null);

  const [filter, setFilter] = useState({
    status: "在籍者", // 在籍者, 退職者
    order: "昇順", // 昇順, 降順
  });

  const handleStatusChange = (status: string) => {
    setFilter({ ...filter, status });
  };

  const handleOrderChange = (order: string) => {
    setFilter({ ...filter, order });
  };

  const handleScroll = (direction: "left" | "right") => {
    if (tableRef.current) {
      const scrollAmount = 300; // スクロール量（ピクセル）
      const currentScroll = tableRef.current.scrollLeft;
      const newScroll =
        direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount;

      tableRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }
  };

  const filteredAndSortedStaffList = staffList
    .filter((staff) => {
      if (filter.status === "在籍者") {
        return !staff.welfareBenefits.resignationAt;
      } else {
        return !!staff.welfareBenefits.resignationAt;
      }
    })
    .sort((a, b) => {
      const aId = Number(a.personal.workerId);
      const bId = Number(b.personal.workerId);
      return filter.order === "昇順" ? aId - bId : bId - aId;
    });

  useEffect(() => {
    const fetchStaffList = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/staff-list/get");
        const data = await response.json();
        setStaffList(data);
      } catch (error) {
        console.error("スタッフリストの取得に失敗しました:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStaffList();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center gap-8 mb-6">
          {/* ステータスフィルター */}
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-orange-500"
                name="status"
                checked={filter.status === "在籍者"}
                onChange={() => handleStatusChange("在籍者")}
              />
              <span className="ml-2">在籍者</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-orange-500"
                name="status"
                checked={filter.status === "退職者"}
                onChange={() => handleStatusChange("退職者")}
              />
              <span className="ml-2">退職者</span>
            </label>
          </div>

          {/* 並び順フィルター */}
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-orange-500"
                name="order"
                checked={filter.order === "昇順"}
                onChange={() => handleOrderChange("昇順")}
              />
              <span className="ml-2">昇順</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-orange-500"
                name="order"
                checked={filter.order === "降順"}
                onChange={() => handleOrderChange("降順")}
              />
              <span className="ml-2">降順</span>
            </label>
          </div>

          {/* ページネーションコントロール */}
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="前のページ"
              onClick={() => handleScroll("left")}
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="次のページ"
              onClick={() => handleScroll("right")}
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto" ref={tableRef}>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-orange-50">
                <tr>
                  <th
                    scope="col"
                    className="sticky left-0 z-10 bg-orange-50 px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    職員番号
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    名前
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    フリガナ
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    所属
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    性別
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    生年月日
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    入社日
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    退職日
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    退職理由
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    雇用形態
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    役職
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    等級
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    地域
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    資格
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    所定日数
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    所定時間
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    希望休暇
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    早番免除
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    遅番免除
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    土曜日免除
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    夏季休暇
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    年始休暇
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    年末休暇
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    年度初休暇
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    年度末休暇
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    既存園転勤
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    新規園転勤
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    給与
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    基本給
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    資格手当
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    地域手当
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    役職手当
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    調整手当
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    時給
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    資格時給
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    勤続時給
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    地域時給
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    評価時給
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    調整時給
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    交通費
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    交通手段
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    片道距離
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    扶養控除
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    扶養人数
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    雇用保険
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    社会保険
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    夏季評価
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    冬季評価
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    評価
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    評価反映
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    中退共カウンタ
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    中退共
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    最終職歴
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    職歴１
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    職歴２
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    職歴３
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    職歴４
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    職歴５
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    職歴６
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    職歴７
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredAndSortedStaffList.map((staff) => (
                  <tr key={staff.personal.workerId} className="hover:bg-gray-50">
                    <td className="sticky left-0 z-10 bg-white whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.personal.workerId}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.personal.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.personal.ruby}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.personal.affiliation}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.personal.gender}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.personal.birth
                        ? new Date(staff.personal.birth).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.welfareBenefits.enrollmentAt
                        ? new Date(staff.welfareBenefits.enrollmentAt).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.welfareBenefits.resignationAt
                        ? new Date(staff.welfareBenefits.resignationAt).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.welfareBenefits.resignationReason}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.type}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.post}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.grade}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.area}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.qualification}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.workingDays}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.workingHour}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.type === "多様な正社員"
                        ? staff.evaluation.requestedDayoff
                          ? "あり"
                          : "なし"
                        : "-"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.type === "多様な正社員"
                        ? staff.evaluation.earlyShift
                          ? "あり"
                          : "なし"
                        : "-"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.type === "多様な正社員"
                        ? staff.evaluation.lateShift
                          ? "あり"
                          : "なし"
                        : "-"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.type === "多様な正社員"
                        ? staff.evaluation.saturdayDayoff
                          ? "あり"
                          : "なし"
                        : "-"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.type === "多様な正社員"
                        ? staff.evaluation.summerVacation
                          ? "あり"
                          : "なし"
                        : "-"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.type === "多様な正社員"
                        ? staff.evaluation.newYearVacation
                          ? "あり"
                          : "なし"
                        : "-"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.type === "多様な正社員"
                        ? staff.evaluation.yearEndVacation
                          ? "あり"
                          : "なし"
                        : "-"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.type === "多様な正社員"
                        ? staff.evaluation.startFiscalYearVacation
                          ? "あり"
                          : "なし"
                        : "-"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.type === "多様な正社員"
                        ? staff.evaluation.endFiscalYearVacation
                          ? "あり"
                          : "なし"
                        : "-"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.type === "多様な正社員"
                        ? staff.evaluation.existingTransfar
                          ? "あり"
                          : "なし"
                        : "-"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.type === "多様な正社員"
                        ? staff.evaluation.newTransfar
                          ? "あり"
                          : "なし"
                        : "-"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.salary.salary}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.salary.basicSalary}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.salary.qualificationAllowance}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.salary.areaAllowance}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.salary.postAllowance}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.salary.adjustmentAllowance}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.salary.hourlyWage}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.salary.qualificationWage}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.salary.enrollmentWage}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.salary.areaWage}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.salary.evaluationWage}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.salary.adjustmentWage}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.welfareBenefits.commutingAllowance}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.welfareBenefits.meansOfTransportation}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.welfareBenefits.oneWayDistance}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.welfareBenefits.dependentDeducationFlg ? "あり" : "なし"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.welfareBenefits.dependentDeducationFlg
                        ? staff.welfareBenefits.numberOfDependents
                        : "-"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.welfareBenefits.unemployeeInsuranceFlg ? "あり" : "なし"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.welfareBenefits.socialInsuranceFlg ? "あり" : "なし"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.summerEvaluation}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.winterEvaluation}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.evaluationFlg ? "あり" : "なし"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.evaluationRefrectFlg ? "あり" : "なし"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.smer}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.evaluation.smerFlg ? "あり" : "なし"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.careers[0]?.enrollmentAt
                        ? `${new Date(
                            staff.careers[0].enrollmentAt
                          ).toLocaleDateString()} - ${new Date(
                            staff.careers[0].resignationAt
                          ).toLocaleDateString()} | ${staff.careers[0].occupation} / ${
                            staff.careers[0].companyName
                          }`
                        : ""}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.careers[1]?.enrollmentAt
                        ? `${new Date(
                            staff.careers[1].enrollmentAt
                          ).toLocaleDateString()} - ${new Date(
                            staff.careers[1].resignationAt
                          ).toLocaleDateString()} | ${staff.careers[1].occupation} / ${
                            staff.careers[1].companyName
                          }`
                        : ""}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.careers[2]?.enrollmentAt
                        ? `${new Date(
                            staff.careers[2].enrollmentAt
                          ).toLocaleDateString()} - ${new Date(
                            staff.careers[2].resignationAt
                          ).toLocaleDateString()} | ${staff.careers[2].occupation} / ${
                            staff.careers[2].companyName
                          }`
                        : ""}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.careers[3]?.enrollmentAt
                        ? `${new Date(
                            staff.careers[3].enrollmentAt
                          ).toLocaleDateString()} - ${new Date(
                            staff.careers[3].resignationAt
                          ).toLocaleDateString()} | ${staff.careers[3].occupation} / ${
                            staff.careers[3].companyName
                          }`
                        : ""}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.careers[4]?.enrollmentAt
                        ? `${new Date(
                            staff.careers[4].enrollmentAt
                          ).toLocaleDateString()} - ${new Date(
                            staff.careers[4].resignationAt
                          ).toLocaleDateString()} | ${staff.careers[4].occupation} / ${
                            staff.careers[4].companyName
                          }`
                        : ""}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.careers[5]?.enrollmentAt
                        ? `${new Date(
                            staff.careers[5].enrollmentAt
                          ).toLocaleDateString()} - ${new Date(
                            staff.careers[5].resignationAt
                          ).toLocaleDateString()} | ${staff.careers[5].occupation} / ${
                            staff.careers[5].companyName
                          }`
                        : ""}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.careers[6]?.enrollmentAt
                        ? `${new Date(
                            staff.careers[6].enrollmentAt
                          ).toLocaleDateString()} - ${new Date(
                            staff.careers[6].resignationAt
                          ).toLocaleDateString()} | ${staff.careers[6].occupation} / ${
                            staff.careers[6].companyName
                          }`
                        : ""}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {staff.careers[7]?.enrollmentAt
                        ? `${new Date(
                            staff.careers[7].enrollmentAt
                          ).toLocaleDateString()} - ${new Date(
                            staff.careers[7].resignationAt
                          ).toLocaleDateString()} | ${staff.careers[7].occupation} / ${
                            staff.careers[7].companyName
                          }`
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
