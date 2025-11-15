interface ConfirmScreenProps {
  className: string;
  childName: string;
  pickupTime?: string | null;
  pickupPersonName?: string | null;
  temperature?: number | null;
  condition?: string | null;
  hasMedicine?: boolean | null;
  canOutdoorPlay?: boolean | null;
  canWaterPlay?: boolean | null;
  absenceReason?: string | null;
  absenceDetail?: string | null;
  isSuspension?: boolean | null;
  isMedicationEnabled?: boolean;
  isWaterPlayEnabled?: boolean;
  onConfirm: () => void;
  onBack: () => void;
}

import { Button } from "@/components/common/Button";

export function ConfirmScreen({
  className,
  childName,
  pickupTime,
  pickupPersonName,
  temperature,
  condition,
  hasMedicine,
  canOutdoorPlay,
  canWaterPlay,
  absenceReason,
  absenceDetail,
  isSuspension,
  isMedicationEnabled,
  isWaterPlayEnabled,
  onConfirm,
  onBack,
}: ConfirmScreenProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border-4 border-gray-100">
      <h2 className="text-xl font-bold text-gray-700 mb-6">{pickupTime ? "登園情報の確認" : absenceReason ? "欠席情報の確認" : "降園情報の確認"}</h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">クラス</p>
          <p className="font-bold text-gray-700">{className}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">名前</p>
          <p className="font-bold text-gray-700">{childName}</p>
        </div>

        {pickupTime && (
          <div>
            <p className="text-sm text-gray-500">お迎え時間</p>
            <p className="font-bold text-gray-700">{pickupTime}</p>
          </div>
        )}

        {pickupPersonName && (
          <div>
            <p className="text-sm text-gray-500">お迎え者</p>
            <p className="font-bold text-gray-700">{pickupPersonName}</p>
          </div>
        )}

        {temperature && (
          <div>
            <p className="text-sm text-gray-500">体温</p>
            <p className="font-bold text-gray-700">{temperature}℃</p>
          </div>
        )}

        {condition && (
          <div>
            <p className="text-sm text-gray-500">体調</p>
            <p className="font-bold text-gray-700">{condition}</p>
          </div>
        )}

        {isMedicationEnabled === true && hasMedicine !== null && (
          <div>
            <p className="text-sm text-gray-500">保育園にて服用する薬</p>
            <p className="font-bold text-gray-700">{hasMedicine ? "あり" : "なし"}</p>
          </div>
        )}
        {canOutdoorPlay !== null && (
          <div>
            <p className="text-sm text-gray-500">外遊び</p>
            <p className="font-bold text-gray-700">{canOutdoorPlay ? "〇" : "×"}</p>
          </div>
        )}

        {isWaterPlayEnabled === true && canWaterPlay !== null && (
          <div>
            <p className="text-sm text-gray-500">水遊び</p>
            <p className="font-bold text-gray-700">{canWaterPlay ? "〇" : "×"}</p>
          </div>
        )}

        {absenceReason && (
          <div>
            <p className="text-sm text-gray-500">欠席理由</p>
            <p className="font-bold text-gray-700">{absenceReason}</p>
          </div>
        )}

        {absenceDetail && (
          <div>
            <p className="text-sm text-gray-500">欠席理由詳細</p>
            <p className="font-bold text-gray-700 break-words">{absenceDetail}</p>
          </div>
        )}
        {isSuspension !== null && (
          <div>
            <p className="text-sm text-gray-500">出席停止</p>
            <p className="font-bold text-gray-700">{isSuspension ? "出席停止扱い" : "欠席扱い"}</p>
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-8">
        <Button
          onClick={onBack}
          variant={absenceReason ? "outline-secondary" : "outline-primary"}
          size="md"
          className={`flex-1 ${absenceReason ? "hover:border-violet-200" : "hover:border-orange-200"}`}
        >
          戻る
        </Button>
        <Button onClick={onConfirm} variant={absenceReason ? "secondary" : "primary"} size="md" className="flex-1">
          確定
        </Button>
      </div>
    </div>
  );
}
