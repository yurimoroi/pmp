import { FiCalendar, FiList } from "react-icons/fi";
import Link from "next/link";

type SchedulePopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SchedulePopup({ isOpen, onClose }: SchedulePopupProps) {
  if (!isOpen) return null;

  const menuItems = [
    {
      title: "変更予約",
      description: "情報の変更を予約することができます",
      href: "/schedule-create",
      icon: FiCalendar,
    },
    {
      title: "予約一覧",
      description: "予約されている変更内容を確認できます",
      href: "/schedule-list",
      icon: FiList,
    },
  ];

  return (
    <>
      {/* オーバーレイ */}
      <div className="fixed inset-0 backdrop-blur-sm bg-white/30 z-40" onClick={onClose} />

      {/* ポップアップ */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-[480px]">
          <div className="grid grid-cols-1 gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group block bg-white rounded-lg border-2 border-orange-200 p-6 hover:border-orange-400 transition-colors"
                onClick={onClose}
              >
                <div className="flex items-start gap-4">
                  <div className="text-orange-400 group-hover:text-orange-500">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
