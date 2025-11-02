import {
  FiUser,
  FiUserPlus,
  FiPrinter,
  FiCalendar,
  FiClock,
  FiSettings,
  FiTool,
  FiUsers,
} from "react-icons/fi";
import Link from "next/link";
import { IconType } from "react-icons";

type DashboardCardProps = {
  title: string;
  description: string;
  href: string;
};

const iconMap: { [key: string]: IconType } = {
  "/staff-list": FiUser,
  "/staff-info": FiUserPlus,
  "/staff-print": FiPrinter,
  "/schedule": FiCalendar,
  "/history": FiClock,
  "/settings": FiSettings,
  "/accounts": FiTool,
  "/nursery": FiUsers,
};

export function DashboardCard({ title, description, href }: DashboardCardProps) {
  const Icon = iconMap[href] || FiUser;

  return (
    <Link
      href={href}
      className="group block bg-white rounded-lg border-2 border-orange-200 p-6 hover:border-orange-400 transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="text-orange-400 group-hover:text-orange-500">
          <Icon className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>
    </Link>
  );
}
