"use client";

import { useState } from "react";
import { FaUserTimes, FaClipboardList, FaFileAlt, FaCog, FaUsers } from "react-icons/fa";
import { NurseryButton } from "@/components/NurseryButton";
import { useRouter } from "next/navigation";
import { ReportModal } from "@/components/admin/ReportModal";

export default function NurseryAdminPage() {
  const router = useRouter();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleAbsence = () => {
    const params = new URLSearchParams({
      mode: "absence",
    });
    router.push(`/nursery/child-condition?${params.toString()}`);
  };

  const handleAttendance = () => router.push("/nursery/child-list");

  const handleChildRegister = () => router.push("/nursery/child-register");

  const handleReport = () => {
    setIsReportModalOpen(true);
  };

  const handleSettings = () => router.push("/nursery/settings");

  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex items-center">
      <main className="w-full max-w-xl mx-auto p-6">
        <div className="flex flex-col items-center space-y-8">
          <NurseryButton icon={FaUserTimes} type="admin" label="欠席入力" onClick={handleAbsence} />

          <NurseryButton
            icon={FaClipboardList}
            type="admin"
            label="出席表"
            onClick={handleAttendance}
          />

          <NurseryButton
            icon={FaUsers}
            type="admin"
            label="園児登録"
            onClick={handleChildRegister}
          />

          <NurseryButton icon={FaFileAlt} type="admin" label="帳票出力" onClick={handleReport} />

          <NurseryButton icon={FaCog} type="admin" label="設定" onClick={handleSettings} />
        </div>
      </main>

      {isReportModalOpen && <ReportModal onClose={() => setIsReportModalOpen(false)} />}
    </div>
  );
}
