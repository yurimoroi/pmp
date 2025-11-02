"use client";

import { careerOccupationOptions } from "@/options/worker-system/options";
import { type CareerEntry } from "@/types/staff";

interface CareerInfoSectionProps {
  careers: CareerEntry[];
  onCareersChange: (careers: CareerEntry[]) => void;
}

export function CareerInfoSection({ careers, onCareersChange }: CareerInfoSectionProps) {
  const inputClassName =
    "rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-gray-900 placeholder:text-gray-500 px-3 py-2";

  function addCareer() {
    if (careers.length < 8) {
      onCareersChange([
        ...careers,
        { enrollmentAt: "", resignationAt: "", occupation: "", companyName: "" },
      ]);
    }
  }

  function handleCareerChange(index: number, field: keyof CareerEntry, value: string) {
    const newCareers = [...careers];
    newCareers[index] = {
      ...newCareers[index],
      [field]: value,
    };
    onCareersChange(newCareers);
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">経歴情報</h2>
        <button
          onClick={addCareer}
          disabled={careers.length >= 8}
          className="px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          追加
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">入社日</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">退職日</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">職種</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">企業名</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {careers.map((career, index) => (
              <tr key={index}>
                <td className="px-4 py-2">
                  <input
                    type="date"
                    className={`w-full ${inputClassName}`}
                    value={career.enrollmentAt}
                    onChange={(e) => handleCareerChange(index, "enrollmentAt", e.target.value)}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="date"
                    className={`w-full ${inputClassName}`}
                    value={career.resignationAt}
                    onChange={(e) => handleCareerChange(index, "resignationAt", e.target.value)}
                  />
                </td>
                <td className="px-4 py-2">
                  <select
                    className={`w-full ${inputClassName}`}
                    value={career.occupation}
                    onChange={(e) => handleCareerChange(index, "occupation", e.target.value)}
                  >
                    <option value="">未選択</option>
                    {careerOccupationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    className={`w-full ${inputClassName}`}
                    value={career.companyName}
                    onChange={(e) => handleCareerChange(index, "companyName", e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
