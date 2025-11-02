import {
  Pill as PillIcon,
  AlertTriangle as ExclamationTriangleIcon,
  Ban as BanIcon,
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
  MinusCircle as MinusCircleIcon,
} from "lucide-react";
import { format } from "date-fns";
import { Children } from "@/types/child-list";

// 共通のクラス名を定数として管理
const COMMON_CLASSES = {
  tableCell: "py-4 px-6",

  // 状態に応じた背景色
  rowBackground: {
    absent: "bg-red-50",
    present: "bg-green-50",
    default: "bg-gray-50",
  },

  // ステータスバッジ
  statusBadge: "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold",
  statusBadgeVariant: {
    absent: "bg-red-100 text-red-700",
    present: "bg-green-100 text-green-700",
    default: "bg-gray-100 text-gray-700",
  },

  // アイコン
  icon: {
    small: "w-4 h-4",
    medium: "w-5 h-5",
  },

  // 体温スタイル
  temperature: {
    normal: "text-gray-700",
    warning: "text-yellow-600 font-bold",
    danger: "text-red-600 font-bold",
  },

  // 薬の有無バッジ
  medicineBadge: "inline-block px-3 py-1 rounded-full text-sm font-bold",
  medicineBadgeVariant: {
    has: "bg-yellow-100 text-yellow-700",
    none: "bg-gray-100 text-gray-700",
  },

  // 遊び許可バッジ
  playBadge: "inline-block px-3 py-1 rounded-full text-sm font-bold",
  playBadgeVariant: {
    ok: "bg-blue-100 text-blue-700",
    ng: "bg-red-100 text-red-700",
  },

  // 出席停止バッジ
  attendanceBadge: "inline-block px-3 py-1 rounded-full text-sm font-bold",
  attendanceBadgeVariant: {
    stopped: "bg-red-100 text-red-700",
    normal: "bg-gray-100 text-gray-700",
  },
} as const;

const tableHeaders = [
  "名前",
  "出欠",
  "登園時刻",
  "降園時刻",
  "お迎え予定時間",
  "お迎え保護者",
  "体温",
  "体調",
  "薬",
  "外遊び",
  "水遊び",
  "欠席理由",
  "出席停止",
];

const ConditionTable = ({
  children,
  setEditingChildren,
}: {
  children: Children[];
  setEditingChildren: (child: Children) => void;
}) => {
  const handleEditClick = (child: Children) => {
    setEditingChildren(child);
  };

  const getRowBackgroundClass = (child: Children) => {
    if (child.absenceReason) return COMMON_CLASSES.rowBackground.absent;
    if (child.attendanceAt) return COMMON_CLASSES.rowBackground.present;
    return COMMON_CLASSES.rowBackground.default;
  };

  const getStatusBadgeClass = (child: Children) => {
    if (child.absenceReason) return COMMON_CLASSES.statusBadgeVariant.absent;
    if (child.attendanceAt) return COMMON_CLASSES.statusBadgeVariant.present;
    return COMMON_CLASSES.statusBadgeVariant.default;
  };

  const getTemperatureStyle = (temperature?: number | null) => {
    if (!temperature) return "";
    if (temperature >= 37.5) return COMMON_CLASSES.temperature.danger;
    if (temperature >= 37.0) return COMMON_CLASSES.temperature.warning;
    return COMMON_CLASSES.temperature.normal;
  };

  return (
    <div className="bg-white rounded-2xl border-4 border-gray-100 overflow-x-auto">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="bg-gray-50">
            {tableHeaders.map((header) => (
              <th
                key={header}
                className={`py-4 px-6 text-left text-sm font-bold text-gray-500 min-w-[120px]`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {children.map((child) => (
            <tr
              key={child.childId}
              onClick={() => handleEditClick(child)}
              className={`border-t border-gray-100 hover:bg-violet-50 cursor-pointer transition-colors duration-200 ${getRowBackgroundClass(
                child
              )}`}
            >
              <td className={COMMON_CLASSES.tableCell}>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-700">{child.children.name}</span>
                  {child.stopAttendanceFlg && (
                    <BanIcon
                      className={`${COMMON_CLASSES.icon.medium} text-red-500`}
                      aria-label="出席停止中"
                    />
                  )}
                </div>
              </td>
              <td className={COMMON_CLASSES.tableCell}>
                <span className={`${COMMON_CLASSES.statusBadge} ${getStatusBadgeClass(child)}`}>
                  {child.attendanceAt && !child.absenceReason && (
                    <CheckCircleIcon className={COMMON_CLASSES.icon.small} />
                  )}
                  {child.absenceReason && <XCircleIcon className={COMMON_CLASSES.icon.small} />}
                  {!child.absenceReason && !child.attendanceAt && (
                    <MinusCircleIcon className={COMMON_CLASSES.icon.small} />
                  )}
                </span>
              </td>
              <td className={COMMON_CLASSES.tableCell}>
                {child.attendanceTime ? format(child.attendanceTime, "HH:mm") : "-"}
              </td>
              <td className={COMMON_CLASSES.tableCell}>
                {child.pickupTime ? format(child.pickupTime, "HH:mm") : "-"}
              </td>
              <td className={COMMON_CLASSES.tableCell}>
                {child.pickupPlanTime ? child.pickupPlanTime : "-"}
              </td>
              <td className={COMMON_CLASSES.tableCell}>
                {child.pickupPerson ? child.pickupPerson : "-"}
              </td>
              <td
                className={`${COMMON_CLASSES.tableCell} ${getTemperatureStyle(
                  child.bodyTemperature
                )}`}
              >
                {child.bodyTemperature ? (
                  <div className="flex items-center gap-1">
                    {child.bodyTemperature >= 37.5 && (
                      <ExclamationTriangleIcon
                        className={`${COMMON_CLASSES.icon.medium} text-red-500`}
                      />
                    )}
                    {child.bodyTemperature}℃
                  </div>
                ) : (
                  "-"
                )}
              </td>
              <td className={COMMON_CLASSES.tableCell}>
                {child.conditions ? child.conditions : "-"}
              </td>
              <td className={COMMON_CLASSES.tableCell}>
                {child.takeMedicineFlg !== null ? (
                  <div className="flex items-center gap-1">
                    {child.takeMedicineFlg && (
                      <PillIcon className={`${COMMON_CLASSES.icon.medium} text-yellow-500`} />
                    )}
                    <span
                      className={`${COMMON_CLASSES.medicineBadge} ${
                        child.takeMedicineFlg
                          ? COMMON_CLASSES.medicineBadgeVariant.has
                          : COMMON_CLASSES.medicineBadgeVariant.none
                      }`}
                    >
                      {child.takeMedicineFlg === true
                        ? "有"
                        : child.takeMedicineFlg === false
                        ? "無"
                        : ""}
                    </span>
                  </div>
                ) : (
                  "-"
                )}
              </td>
              <td className={COMMON_CLASSES.tableCell}>
                {child.playingOutside !== null ? (
                  <span
                    className={`${COMMON_CLASSES.playBadge} ${
                      child.playingOutside === true
                        ? COMMON_CLASSES.playBadgeVariant.ok
                        : child.playingOutside === false
                        ? COMMON_CLASSES.playBadgeVariant.ng
                        : ""
                    }`}
                  >
                    {child.playingOutside === true
                      ? "OK"
                      : child.playingOutside === false
                      ? "NG"
                      : ""}
                  </span>
                ) : (
                  "-"
                )}
              </td>
              <td className={COMMON_CLASSES.tableCell}>
                {child.playingWater !== null ? (
                  <span
                    className={`${COMMON_CLASSES.playBadge} ${
                      child.playingWater === true
                        ? COMMON_CLASSES.playBadgeVariant.ok
                        : child.playingWater === false
                        ? COMMON_CLASSES.playBadgeVariant.ng
                        : ""
                    }`}
                  >
                    {child.playingWater === true ? "OK" : child.playingWater === false ? "NG" : ""}
                  </span>
                ) : (
                  "-"
                )}
              </td>
              <td className={COMMON_CLASSES.tableCell}>
                {child.absenceReason ? child.absenceReason : "-"}
              </td>
              <td className={COMMON_CLASSES.tableCell}>
                {child.absenceReason !== null ? (
                  <span
                    className={`${COMMON_CLASSES.attendanceBadge} ${
                      child.stopAttendanceFlg
                        ? COMMON_CLASSES.attendanceBadgeVariant.stopped
                        : COMMON_CLASSES.attendanceBadgeVariant.normal
                    }`}
                  >
                    {child.stopAttendanceFlg === true
                      ? "停止中"
                      : child.stopAttendanceFlg === false
                      ? "通常"
                      : ""}
                  </span>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConditionTable;
