import { useState } from "react";
import { absenseReasonOptions } from "@/options/nursery-system/options";
import { SelectButton, ActionButton } from "@/components/common/Button";

interface AbsenceReasonSelectProps {
  onComplete: (reason: string, detail: string, isSuspension: boolean) => void;
}

export function AbsenceReasonSelect({ onComplete }: AbsenceReasonSelectProps) {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [otherReason, setOtherReason] = useState<string>("");
  const [isSuspension, setIsSuspension] = useState<boolean>(false);

  const handleSubmit = () => {
    if (selectedReason) {
      const detail = selectedReason === "その他" ? otherReason : "";
      onComplete(selectedReason, detail, isSuspension);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-gray-700 mb-4">欠席理由を選択してください</h2>

      {/* 理由選択 */}
      <div className="grid grid-cols-2 gap-4">
        {absenseReasonOptions.map((reason) => (
          <SelectButton
            key={reason}
            onClick={() => setSelectedReason(reason)}
            isSelected={selectedReason === reason}
            variant="secondary"
          >
            {reason}
          </SelectButton>
        ))}
      </div>

      {/* その他の理由入力欄 */}
      {selectedReason === "その他" && (
        <div className="mt-4">
          <textarea
            value={otherReason}
            onChange={(e) => setOtherReason(e.target.value)}
            maxLength={100}
            placeholder="理由を入力してください"
            className="w-full p-4 rounded-2xl border-4 border-gray-100 focus:border-violet-400 focus:outline-none resize-none h-32"
          />
        </div>
      )}

      {/* 出席停止チェックボックス */}
      <div className="flex items-center space-x-2 py-4">
        <input
          type="checkbox"
          id="suspension"
          checked={isSuspension}
          onChange={(e) => setIsSuspension(e.target.checked)}
          className="w-5 h-5 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
        />
        <label htmlFor="suspension" className="text-lg text-gray-700 font-medium">
          出席停止の場合はチェックしてください
        </label>
      </div>

      {/* 次へボタン */}
      <ActionButton
        onClick={handleSubmit}
        disabled={!selectedReason || (selectedReason === "その他" && !otherReason)}
        variant="secondary"
      >
        次へ
      </ActionButton>
    </div>
  );
}
