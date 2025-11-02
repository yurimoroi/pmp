"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiUser, FiUserPlus, FiPrinter, FiCalendar, FiClock, FiSettings, FiTool, FiUsers } from "react-icons/fi";
import { SchedulePopup } from "@/components/schedule/SchedulePopup";
import { useUser } from "@/context/userContext";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [isSchedulePopupOpen, setIsSchedulePopupOpen] = useState(false);
  const { user } = useUser();

  const menuItems = [
    { href: "/staff-list", label: "職員一覧", icon: FiUser, roles: ["管理者", "編集者", "閲覧者"] },
    { href: "/staff-info", label: "職員情報", icon: FiUserPlus, roles: ["管理者", "編集者"] },
    { href: "/staff-print", label: "印刷", icon: FiPrinter, roles: ["管理者", "編集者", "閲覧者"] },
    { href: "#", label: "変更予約", icon: FiCalendar, roles: ["管理者", "編集者"] },
    { href: "/retirement", label: "退職者制度", icon: FiUserPlus, roles: ["管理者"] },
    { href: "/history", label: "操作履歴", icon: FiClock, roles: ["管理者"] },
    { href: "/settings", label: "設定", icon: FiSettings, roles: ["管理者"] },
    { href: "/accounts", label: "アカウント管理", icon: FiTool, roles: ["管理者"] },
    { href: "/nursery", label: "登降園管理", icon: FiUsers, roles: ["保育園"] },
  ];

  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(user?.group ?? ""));

  const handleMenuClick = (href: string, e: React.MouseEvent) => {
    if (href === "#") {
      e.preventDefault();
      setIsSchedulePopupOpen(true);
    }
    onClose();
  };

  return (
    <>
      {/* オーバーレイ */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={onClose} />}

      {/* サイドバー */}
      <div
        className={`fixed top-[64px] left-0 h-[calc(100vh-64px)] w-64 bg-orange-500 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <nav className="h-full">
          <ul className="py-2">
            {filteredMenuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-6 py-3 text-white hover:bg-orange-600 ${pathname === item.href ? "bg-orange-600" : ""}`}
                  onClick={(e) => handleMenuClick(item.href, e)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <SchedulePopup isOpen={isSchedulePopupOpen} onClose={() => setIsSchedulePopupOpen(false)} />
    </>
  );
}
