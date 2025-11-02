"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateReservationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    changeDate: "",
    employeeId: "",
    name: "",
    nameKana: "",
    birthDate: "",
    gender: "",
    phoneNumber: "",
    postalCode: "",
    address: "",
    department: "",
    position: "",
    joinDate: "",
    leaveDate: "",
    leaveReason: "",
    transportationFee: "",
    transportationRoute: "",
    monthlyPass: "",
    socialInsurance: "",
    dependentsCount: "",
    employmentInsurance: "",
    socialInsuranceNumber: "",
    remarks: "",
    // 給与情報
    rank: "",
    area: "",
    employmentType: "",
    role: "",
    grade: "",
    // 正社員
    monthlySalary: "",
    baseSalary: "",
    jobAllowance: "",
    areaAllowance: "",
    roleAllowance: "",
    otherAllowance: "",
    // パート
    hourlyWage: "",
    responsibilityAllowance: "",
    attendanceAllowance: "",
    regularAllowance: "",
    skillAllowance: "",
    qualificationAllowance: "",
    // 人事評価
    summer: "",
    winter: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 登録処理の実装
    console.log("登録処理:", formData);
  };

  const handleCalculate = () => {
    // 計算処理の実装
    console.log("計算処理");
  };

  const handleGradeReflection = () => {
    // 等級反映処理の実装
    console.log("等級反映処理");
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">変更予約作成</h1>
          <div className="space-x-4">
            <button
              onClick={handleCalculate}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              計算
            </button>
            <button
              onClick={handleGradeReflection}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              等級反映
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              登録
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 基本情報 */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">基本情報</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">変更日</label>
                <input
                  type="date"
                  value={formData.changeDate}
                  onChange={(e) => setFormData({ ...formData, changeDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">職員番号</label>
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">氏名</label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="氏名"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  />
                  <input
                    type="text"
                    value={formData.nameKana}
                    onChange={(e) => setFormData({ ...formData, nameKana: e.target.value })}
                    placeholder="フリガナ"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">生年月日</label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">性別</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">選択してください</option>
                  <option value="male">男性</option>
                  <option value="female">女性</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">電話番号</label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">郵便番号</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">住所</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">所属</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">選択してください</option>
                  <option value="総務部">総務部</option>
                  <option value="人事部">人事部</option>
                  <option value="経理部">経理部</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">職種</label>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">選択してください</option>
                  <option value="事務職">事務職</option>
                  <option value="技術職">技術職</option>
                  <option value="営業職">営業職</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">入社日</label>
                <input
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">退職日</label>
                <input
                  type="date"
                  value={formData.leaveDate}
                  onChange={(e) => setFormData({ ...formData, leaveDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">退職理由</label>
                <select
                  value={formData.leaveReason}
                  onChange={(e) => setFormData({ ...formData, leaveReason: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">選択してください</option>
                  <option value="自己都合">自己都合</option>
                  <option value="会社都合">会社都合</option>
                  <option value="契約満了">契約満了</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">交通費</label>
                <input
                  type="number"
                  value={formData.transportationFee}
                  onChange={(e) => setFormData({ ...formData, transportationFee: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">交通手段</label>
                <select
                  value={formData.transportationRoute}
                  onChange={(e) =>
                    setFormData({ ...formData, transportationRoute: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">選択してください</option>
                  <option value="電車">電車</option>
                  <option value="バス">バス</option>
                  <option value="自家用車">自家用車</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">定期代</label>
                <input
                  type="number"
                  value={formData.monthlyPass}
                  onChange={(e) => setFormData({ ...formData, monthlyPass: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">社会保険</label>
                <select
                  value={formData.socialInsurance}
                  onChange={(e) => setFormData({ ...formData, socialInsurance: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">選択してください</option>
                  <option value="未加入">未加入</option>
                  <option value="加入">加入</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">扶養人数</label>
                <input
                  type="number"
                  value={formData.dependentsCount}
                  onChange={(e) => setFormData({ ...formData, dependentsCount: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">雇用保険</label>
                <select
                  value={formData.employmentInsurance}
                  onChange={(e) =>
                    setFormData({ ...formData, employmentInsurance: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">選択してください</option>
                  <option value="未加入">未加入</option>
                  <option value="加入">加入</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">備考</label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* 給与情報 */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">給与情報</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">職種</label>
                <select
                  value={formData.rank}
                  onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">選択してください</option>
                  <option value="一般職">一般職</option>
                  <option value="総合職">総合職</option>
                  <option value="管理職">管理職</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">エリア</label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">選択してください</option>
                  <option value="東京">東京</option>
                  <option value="大阪">大阪</option>
                  <option value="名古屋">名古屋</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">雇用形態</label>
                <select
                  value={formData.employmentType}
                  onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">選択してください</option>
                  <option value="正社員">正社員</option>
                  <option value="契約社員">契約社員</option>
                  <option value="パート">パート</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">役職</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">選択してください</option>
                  <option value="一般">一般</option>
                  <option value="主任">主任</option>
                  <option value="課長">課長</option>
                  <option value="部長">部長</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">等級</label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">選択してください</option>
                  <option value="1">1級</option>
                  <option value="2">2級</option>
                  <option value="3">3級</option>
                  <option value="4">4級</option>
                  <option value="5">5級</option>
                </select>
              </div>
            </div>

            {/* 正社員手当 */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">≪正社員≫</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">月給</label>
                  <input
                    type="number"
                    value={formData.monthlySalary}
                    onChange={(e) => setFormData({ ...formData, monthlySalary: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">基本給</label>
                  <input
                    type="number"
                    value={formData.baseSalary}
                    onChange={(e) => setFormData({ ...formData, baseSalary: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">職務手当</label>
                  <input
                    type="number"
                    value={formData.jobAllowance}
                    onChange={(e) => setFormData({ ...formData, jobAllowance: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">地域手当</label>
                  <input
                    type="number"
                    value={formData.areaAllowance}
                    onChange={(e) => setFormData({ ...formData, areaAllowance: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">役職手当</label>
                  <input
                    type="number"
                    value={formData.roleAllowance}
                    onChange={(e) => setFormData({ ...formData, roleAllowance: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">調整手当</label>
                  <input
                    type="number"
                    value={formData.otherAllowance}
                    onChange={(e) => setFormData({ ...formData, otherAllowance: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* パート手当 */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">≪パート≫</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">時給</label>
                  <input
                    type="number"
                    value={formData.hourlyWage}
                    onChange={(e) => setFormData({ ...formData, hourlyWage: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">責任手当</label>
                  <input
                    type="number"
                    value={formData.responsibilityAllowance}
                    onChange={(e) =>
                      setFormData({ ...formData, responsibilityAllowance: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">在籍手当</label>
                  <input
                    type="number"
                    value={formData.attendanceAllowance}
                    onChange={(e) =>
                      setFormData({ ...formData, attendanceAllowance: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">地域手当</label>
                  <input
                    type="number"
                    value={formData.regularAllowance}
                    onChange={(e) => setFormData({ ...formData, regularAllowance: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">能力手当</label>
                  <input
                    type="number"
                    value={formData.skillAllowance}
                    onChange={(e) => setFormData({ ...formData, skillAllowance: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">資格手当</label>
                  <input
                    type="number"
                    value={formData.qualificationAllowance}
                    onChange={(e) =>
                      setFormData({ ...formData, qualificationAllowance: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* 人事評価 */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">≪人事評価≫</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">夏</label>
                  <select
                    value={formData.summer}
                    onChange={(e) => setFormData({ ...formData, summer: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  >
                    <option value="">選択してください</option>
                    <option value="S">S</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">冬</label>
                  <select
                    value={formData.winter}
                    onChange={(e) => setFormData({ ...formData, winter: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  >
                    <option value="">選択してください</option>
                    <option value="S">S</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
