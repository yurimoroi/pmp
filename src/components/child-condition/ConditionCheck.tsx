import { useState } from "react";
import { conditionOptions } from "@/options/nursery-system/options";
import { SelectButton, ActionButton } from "@/components/common/Button";

interface ConditionCheckProps {
  onComplete: (temperature: number, condition: string, hasMedicine: boolean) => void;
  isMedicationEnabled: boolean;
}

export function ConditionCheck({ onComplete, isMedicationEnabled }: ConditionCheckProps) {
  const [temperature, setTemperature] = useState<string>("36.0");
  const [condition, setCondition] = useState<string>("");
  const [hasMedicine, setHasMedicine] = useState<boolean>(false);

  const handleSubmit = () => {
    const temp = parseFloat(temperature);
    if (!isNaN(temp) && condition) {
      onComplete(temp, condition, hasMedicine);
    }
  };

  return (
    <div className="space-y-8">
      {/* 体温入力 */}
      <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">今朝の体温</h2>
        <div className="flex items-center justify-center space-x-2">
          <input
            type="number"
            step="0.1"
            min="34.0"
            max="40.0"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            className="w-32 py-4 px-6 text-2xl font-bold text-center rounded-2xl border-4 border-gray-100 focus:border-orange-400 focus:outline-none"
          />
          <span className="text-2xl font-bold text-gray-700">℃</span>
        </div>
      </div>

      {/* 体調選択 */}
      <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">今朝の様子</h2>
        <div className="grid grid-cols-2 gap-4">
          {conditionOptions.map((cond) => (
            <SelectButton key={cond} onClick={() => setCondition(cond)} isSelected={condition === cond}>
              {cond}
            </SelectButton>
          ))}
        </div>
      </div>

      {/* 薬の有無チェックボックス */}
      {isMedicationEnabled === true && (
        <div className="flex items-center space-x-2 py-4">
          <input
            type="checkbox"
            id="medicine"
            checked={hasMedicine}
            onChange={(e) => setHasMedicine(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
          />
          <label htmlFor="medicine" className="text-lg text-gray-700 font-medium">
            保育園にて服用する薬がある場合はチェックしてください
          </label>
        </div>
      )}

      {/* 次へボタン */}
      <ActionButton onClick={handleSubmit} disabled={!temperature || !condition}>
        次へ
      </ActionButton>
    </div>
  );
}
