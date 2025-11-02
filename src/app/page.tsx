"use client";

import { useState } from "react";
import { DashboardCard } from "@/components/DashboardCard";
import { SchedulePopup } from "@/components/schedule/SchedulePopup";
import { useUser } from "@/context/userContext";

const menuItems = [
  {
    title: "職員一覧",
    description: "登録されている職員の一覧を表示します",
    href: "/staff-list",
    roles: ["管理者", "編集者", "閲覧者"],
  },
  {
    title: "職員情報",
    description: "職員の詳細情報を登録・編集できます",
    href: "/staff-info",
    roles: ["管理者", "編集者"],
  },
  {
    title: "印刷",
    description: "各種帳票の印刷ができます",
    href: "/staff-print",
    roles: ["管理者", "編集者", "編集者"],
  },
  {
    title: "変更予約",
    description: "情報の変更を予約することができます",
    href: "#",
    roles: ["管理者", "編集者"],
  },
  {
    title: "退職者制度",
    description: "退職者に関する情報を管理します",
    href: "/retirement",
    roles: ["管理者"],
  },
  {
    title: "操作履歴",
    description: "システムの操作履歴を確認できます",
    href: "/history",
    roles: ["管理者"],
  },
  {
    title: "設定",
    description: "システムの各種設定を行います",
    href: "/settings",
    roles: ["管理者"],
  },
  {
    title: "アカウント管理",
    description: "ユーザーアカウントを管理します",
    href: "/accounts",
    roles: ["管理者"],
  },
  {
    title: "登降園管理",
    description: "登降園管理を行います",
    href: "/nursery",
    roles: ["保育園"],
  },
];

export default function DashboardPage() {
  const [isSchedulePopupOpen, setIsSchedulePopupOpen] = useState(false);
  const { user } = useUser();

  const handleCardClick = (href: string) => {
    if (href === "#") {
      setIsSchedulePopupOpen(true);
    }
  };

  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(user?.group || ""));

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMenuItems.map((item) => (
          <div key={item.title} onClick={() => handleCardClick(item.href)}>
            <DashboardCard title={item.title} description={item.description} href={item.href} />
          </div>
        ))}
      </div>

      <SchedulePopup isOpen={isSchedulePopupOpen} onClose={() => setIsSchedulePopupOpen(false)} />
    </div>
  );
}

