"use client";

import { Dispatch, SetStateAction } from "react";
import { type CareerEntry, type StaffBasicInfo, type StaffSalaryInfo } from "@/types/staff";
import { BasicInfoSection } from "./BasicInfoSection";
import { SalaryInfoSection } from "./SalaryInfoSection";
import { CareerInfoSection } from "./CareerInfoSection";

export function StaffInfoForm({
  basicInfo,
  setBasicInfo,
  salaryInfo,
  setSalaryInfo,
  careers,
  setCareers,
}: {
  basicInfo: StaffBasicInfo;
  setBasicInfo: Dispatch<SetStateAction<StaffBasicInfo>>;
  salaryInfo: StaffSalaryInfo;
  setSalaryInfo: Dispatch<SetStateAction<StaffSalaryInfo>>;
  careers: CareerEntry[];
  setCareers: Dispatch<SetStateAction<CareerEntry[]>>;
}) {
  function handleBasicInfoChange(data: Partial<StaffBasicInfo>) {
    setBasicInfo((prev) => ({ ...prev, ...data }));
  }

  function handleSalaryInfoChange(data: Partial<StaffSalaryInfo>) {
    setSalaryInfo((prev) => ({ ...prev, ...data }));
  }

  return (
    <div className="space-y-8">
      <BasicInfoSection data={basicInfo} onChange={handleBasicInfoChange} />
      <SalaryInfoSection data={salaryInfo} onChange={handleSalaryInfoChange} />
      <CareerInfoSection careers={careers} onCareersChange={setCareers} />
    </div>
  );
}

