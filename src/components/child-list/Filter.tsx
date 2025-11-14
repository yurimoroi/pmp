import { FullColorButton } from "@/components/common/Button";
import { Children } from "@/types/child-list";
import { signOut } from "aws-amplify/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface FilterProps {
  nurseryName: string;
  setChildren: (children: Children[]) => void;
  selectedClass: string;
  setSelectedClass: (className: string) => void;
  classes: string[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  handleSaveAll: () => void;
  router: AppRouterInstance;
  token: string | undefined;
}

const Filter = ({
  nurseryName,
  setChildren,
  selectedClass,
  setSelectedClass,
  classes,
  selectedDate,
  setSelectedDate,
  handleSaveAll,
  router,
  token,
}: FilterProps) => {
  const fetchChild = async () => {
    try {
      const response = await fetch("https://4duvwc9h43.execute-api.ap-northeast-1.amazonaws.com/dev/children/attendances-get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nurseryName: nurseryName,
          className: selectedClass,
          date: selectedDate,
        }),
      });
      if (response.status !== 200) {
        if (response.status === 401) {
          alert("セッションが切れました。再度ログインしてください。");
          signOut();
          router.push("/login");
          return;
        }

        throw new Error("データの取得に失敗しました");
      }

      const responseData = await response.json();
      setChildren(responseData);
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
