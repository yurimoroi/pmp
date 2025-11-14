import { FullColorButton } from "@/components/common/Button";
import { AnnualUpdateChildren } from "@/types/annualUpdateChildren";
import { signOut } from "aws-amplify/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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
  router: AppRouterInstance;
  token: string | undefined;
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
  router,
  token,
}: AnnualUpdateFilterProps) => {
  // 園児リストを取得
  const fetchCandidates = async () => {
    try {
      const response = await fetch("https://4duvwc9h43.execute-api.ap-northeast-1.amazonaws.com/dev/children/annual-updates-get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nurseryName: nurseryName,
          className: selectedClass,
          year: new Date().getFullYear(),
        }),
      });

      if (response.status !== 200) {
        if (response.status === 401) {
          alert("セッションが切れました。再度ログインしてください。");
          signOut();
          router.push("/login");
          return;
        }

        const body = await response.json();
        throw new Error(body.message);
      }

      const responseData = await response.json();
      console.log(responseData);

      // 次のクラス名を設定
      responseData.forEach((child: AnnualUpdateChildren) => {
        child.nextClassName = nextClasses[0];
      });

      setAnnualUpdateChildren(responseData);
    } catch (error) {
      console.error("データの取得に失敗しました:", error);
      alert((error as Error).message || "エラーが発生しました。もう一度お試しください。");
      return;
    }
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
          className="w-48 p-2 rounded-xl border-2 border-gray-100 focus:border-violet-400 focus:outline-none text-gray-700"
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
