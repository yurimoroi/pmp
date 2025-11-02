import { format } from "date-fns";
import { AnnualUpdateChildren } from "@/types/annualUpdateChildren";

interface AnnualUpdateTableProps {
  annualUpdateChildren: AnnualUpdateChildren[];
  setAnnualUpdateChildren: (annualUpdateChildren: AnnualUpdateChildren[]) => void;
  classes: string[];
}

// 共通のクラス名を定数として管理
const COMMON_CLASSES = {
  tableCell: "py-4 px-6",
  tableHeader: "py-4 px-6 text-left text-sm font-bold text-gray-500 min-w-[120px]",
  rowHover: "hover:bg-violet-50 cursor-pointer transition-colors duration-200",
  nameText: "font-bold text-gray-700",
  dateText: "text-gray-600",
} as const;

const tableHeaders = ["園児ID", "氏名", "現在のクラス", "次のクラス", "入園日", "退園日"];

const AnnualUpdateTable = ({ annualUpdateChildren, setAnnualUpdateChildren, classes }: AnnualUpdateTableProps) => {
  return (
    <div className="bg-white rounded-2xl border-4 border-gray-100 overflow-x-auto">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="bg-gray-50">
            {tableHeaders.map((header) => (
              <th key={header} className={COMMON_CLASSES.tableHeader}>
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {annualUpdateChildren.length === 0 ? (
            <tr>
              <td colSpan={tableHeaders.length} className={`${COMMON_CLASSES.tableCell} text-center text-gray-500`}>
                卒園対象の園児がいません
              </td>
            </tr>
          ) : (
            annualUpdateChildren.map((child) => (
              <tr key={child.childId} className={`border-t border-gray-100 ${COMMON_CLASSES.rowHover}`}>
                <td className={COMMON_CLASSES.tableCell}>
                  <span className="text-gray-600">{child.childId}</span>
                </td>
                <td className={COMMON_CLASSES.tableCell}>
                  <span className={COMMON_CLASSES.nameText}>{child.name}</span>
                </td>
                <td className={COMMON_CLASSES.tableCell}>
                  <span className={COMMON_CLASSES.nameText}>{child.className}</span>
                </td>
                <td className={COMMON_CLASSES.tableCell}>
                  <select
                    className="w-full"
                    value={child.nextClassName}
                    onChange={(e) =>
                      setAnnualUpdateChildren(
                        annualUpdateChildren.map((annualUpdateChild) => (annualUpdateChild.childId === child.childId ? { ...annualUpdateChild, nextClassName: e.target.value } : annualUpdateChild))
                      )
                    }
                  >
                    {classes.map((className) => (
                      <option key={className} value={className}>
                        {className}
                      </option>
                    ))}
                    <option value="卒園">卒園</option>
                  </select>
                </td>
                <td className={COMMON_CLASSES.tableCell}>
                  <span className={COMMON_CLASSES.dateText}>{format(new Date(child.admissionAt), "yyyy/MM/dd")}</span>
                </td>
                <td className={COMMON_CLASSES.tableCell}>
                  <span className={COMMON_CLASSES.dateText}>{child.leavingAt ? format(new Date(child.leavingAt), "yyyy/MM/dd") : "-"}</span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AnnualUpdateTable;
