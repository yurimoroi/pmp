import { FullColorButton } from "@/components/common/Button";
import { AnnualUpdateChildren } from "@/types/annualUpdateChildren";
import { handleApiError } from "@/utility/api/apiHelper";

interface AnnualUpdateFilterProps {
  nurseryName: string;
  getNextClassName: (className: string) => void;
  setAnnualUpdateChildren: (annualUpdateChildren: AnnualUpdateChildren[]) => void;
  selectedClass: string;
  setSelectedClass: (className: string) => void;
  classes: string[];
  nextClasses: string[];
  handleAnnualUpdate: () => void;
  isProcessing: boolean;
}

const AnnualUpdateFilter = ({
  nurseryName,
  getNextClassName,
  setAnnualUpdateChildren,
  selectedClass,
  setSelectedClass,
  classes,
  nextClasses,
  handleAnnualUpdate,
  isProcessing,
}: AnnualUpdateFilterProps) => {
  // 園児リストを取得
  const fetchCandidates = async () => {
    const response = await fetch(`/api/children/lists/annual-updates?nursery=${nurseryName}&className=${selectedClass}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      handleApiError(response);
      throw new Error("年次更新に失敗しました");
    }
    const responseData = await response.json();

    // 次のクラス名を設定
    responseData.data.forEach((child: AnnualUpdateChildren) => {
      child.nextClassName = nextClasses[0];
    });

    setAnnualUpdateChildren(responseData.data);
  };

  return (
    <div className="bg-white rounded-2xl p-6 mb-8 flex gap-8 items-end border-4 border-gray-100">
      <div>
        <label className="block text-sm text-gray-500 mb-2">クラス</label>
        <select
          value={selectedClass}
          onChange={(e) => {
            setSelectedClass(e.target.value);
            getNextClassName(e.target.value);
          }}
          className="w-48 p-2 rounded-xl border-2 border-gray-100 focus:border-violet-400 focus:outline-none"
        >
          {classes.map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </select>
      </div>

      <FullColorButton onClick={fetchCandidates} variant="violet" disabled={isProcessing}>
        検索
      </FullColorButton>

      <div className="flex-grow" />

      <FullColorButton onClick={handleAnnualUpdate} variant="red" disabled={isProcessing}>
        {isProcessing ? "処理中..." : "年次更新処理実行"}
      </FullColorButton>
    </div>
  );
};

export default AnnualUpdateFilter;
