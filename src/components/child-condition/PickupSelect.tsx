import { useState } from "react";
import { pickupPersonOptions } from "@/options/nursery-system/options";
import { SelectButton, ActionButton } from "@/components/common/Button";
import { getPickupTime } from "@/utility/nursery";

interface PickupSelectProps {
  onComplete: (time: string, personName: string) => void;
}

export function PickupSelect({ onComplete }: PickupSelectProps) {
  const [selectedTime, setSelectedTime] = useState<string>("18:00");
  const [selectedPersonName, setSelectedPersonName] = useState<string>("");

  const times = getPickupTime();

  const handleSubmit = () => {
    if (selectedTime && selectedPersonName) {
      onComplete(selectedTime, selectedPersonName);
    }
  };

  return (
    <div className="space-y-8">
      {/* 時間選択 */}
      <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">お迎え予定時間</h2>
        <div className="w-full max-w-xs">
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="py-4 px-6 rounded-2xl border-4 border-gray-100 bg-white text-gray-700 font-bold text-lg focus:border-orange-400 focus:outline-none transition-all duration-200"
          >
            {times.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* お迎え予定者選択 */}
      <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">お迎え予定者</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {pickupPersonOptions.map((person) => (
            <SelectButton
              key={person}
              onClick={() => setSelectedPersonName(person)}
              isSelected={selectedPersonName === person}
            >
              {person}
            </SelectButton>
          ))}
        </div>
      </div>

      {/* 次へボタン */}
      <ActionButton onClick={handleSubmit} disabled={!selectedTime || !selectedPersonName}>
        次へ
      </ActionButton>
    </div>
  );
}
