import { FullColorButton } from "@/components/common/Button";
import { Children } from "@/types/child-list";
// import { handleApiError } from "@/utility/api/apiHelper";

const Filter = ({
  nurseryName,
  setChildren,
  selectedClass,
  setSelectedClass,
  classes,
  selectedDate,
  setSelectedDate,
  handleSaveAll,
}: {
  nurseryName: string;
  setChildren: (children: Children[]) => void;
  selectedClass: string;
  setSelectedClass: (className: string) => void;
  classes: string[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  handleSaveAll: () => void;
}) => {
  const fetchChild = async () => {
    try {
      const response = await fetch(`/api/children/attendances?nursery=${encodeURIComponent(nurseryName)}&className=${encodeURIComponent(selectedClass)}&date=${encodeURIComponent(selectedDate)}`);
      if (!response.ok) {
        // handleApiError(response);
        throw new Error("データの取得に失敗しました");
      }
      const responseData = await response.json();
      setChildren(responseData.data);
    } catch (error) {
      console.error("データの取得に失敗しました:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 mb-8 flex gap-8 items-end border-4 border-gray-100">
      <div>
        <label className="block text-sm text-gray-500 mb-2">クラス</label>
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-48 p-2 rounded-xl border-2 border-gray-100 focus:border-violet-400 focus:outline-none">
          {classes.map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-500 mb-2">日付</label>
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-48 p-2 rounded-xl border-2 border-gray-100 focus:border-violet-400 focus:outline-none" />
      </div>

      <FullColorButton
        onClick={() => {
          fetchChild();
        }}
        variant="violet"
      >
        検索
      </FullColorButton>
      <div className="flex-grow" />
      <FullColorButton onClick={handleSaveAll} variant="green">
        保存
      </FullColorButton>
    </div>
  );
};

export default Filter;
