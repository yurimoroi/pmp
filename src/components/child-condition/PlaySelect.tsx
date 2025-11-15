import { useState } from "react";
import { ActionButton } from "@/components/common/Button";

interface PlaySelectProps {
  onComplete: (canOutdoorPlay: boolean, canWaterPlay: boolean | null) => void;
  isWaterPlayEnabled: boolean;
}

interface SelectButtonProps {
  onClick: () => void;
  isSelected: boolean;
  children: React.ReactNode;
}

function SelectButton({ onClick, isSelected, children }: SelectButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`py-4 px-6 rounded-2xl border-4 transition-all duration-200
        ${isSelected ? "bg-orange-100 border-orange-400 text-orange-700" : "bg-white border-gray-100 text-gray-700 hover:border-orange-200"}
        font-bold text-lg`}
    >
      {children}
    </button>
  );
}

export function PlaySelect({ onComplete, isWaterPlayEnabled }: PlaySelectProps) {
  const [canOutdoorPlay, setCanOutdoorPlay] = useState<boolean | null>(null);
  const [canWaterPlay, setCanWaterPlay] = useState<boolean | null>(null);

  const handleSubmit = () => {
    if (canOutdoorPlay !== null && (isWaterPlayEnabled ? canWaterPlay !== null : true)) {
      onComplete(canOutdoorPlay, isWaterPlayEnabled ? canWaterPlay : null);
    }
  };

  return (
    <div className="space-y-8">
      {/* 外遊び選択 */}
      <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">外遊びについて</h2>
        <div className="grid grid-cols-2 gap-4">
          <SelectButton onClick={() => setCanOutdoorPlay(true)} isSelected={canOutdoorPlay === true}>
            〇
          </SelectButton>
          <SelectButton onClick={() => setCanOutdoorPlay(false)} isSelected={canOutdoorPlay === false}>
            ×
          </SelectButton>
        </div>
      </div>

      {/* 水遊び選択 */}
      {isWaterPlayEnabled === true && (
        <div>
          <h2 className="text-xl font-bold text-gray-700 mb-4">水遊びについて</h2>
          <div className="grid grid-cols-2 gap-4">
            <SelectButton onClick={() => setCanWaterPlay(true)} isSelected={canWaterPlay === true}>
              〇
            </SelectButton>
            <SelectButton onClick={() => setCanWaterPlay(false)} isSelected={canWaterPlay === false}>
              ×
            </SelectButton>
          </div>
        </div>
      )}

      {/* 次へボタン */}
      <ActionButton onClick={handleSubmit} disabled={canOutdoorPlay === null || (isWaterPlayEnabled && canWaterPlay === null)}>
        次へ
      </ActionButton>
    </div>
  );
}
