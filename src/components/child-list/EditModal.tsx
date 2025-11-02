import {
  absenseReasonOptions,
  conditionOptions,
  pickupPersonOptions,
} from "@/options/nursery-system/options";
import { Children } from "@/types/child-list";
import { useState } from "react";
import { Button } from "../common/Button";
import { getPickupTime } from "@/utility/nursery";

// 共通のクラス名を定数として管理
const COMMON_CLASSES = {
  label: "pl-2 text-sm text-gray-500",
  input:
    "w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:border-violet-400 focus:outline-none",
  textarea:
    "w-full px-3 py-2 rounded-xl border-2 border-gray-100 focus:border-violet-400 focus:outline-none resize-none h-32",
  select:
    "w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:border-violet-400 focus:outline-none",
} as const;

interface EditModalProps {
  children: Children;
  isWaterPlayEnabled: boolean;
  isMedicationEnabled: boolean;
  date: Date;
  onSave: (updatedChildren: Children) => void;
  onClose: () => void;
}

export default function EditModal({
  children,
  isWaterPlayEnabled,
  isMedicationEnabled,
  date,
  onSave,
  onClose,
}: EditModalProps) {
  const [editedChildren, setEditedChildren] = useState<Children>(children);

  const times = getPickupTime();

  const formatTime = (time: string | null) => {
    if (!time) return null;
    const [hours, minutes] = time.split(":");
    const newDate = new Date(date);
    newDate.setHours(parseInt(hours), parseInt(minutes));
    return newDate;
  };

  const handleSave = () => {
    // 入力チェック
    if (
      !editedChildren.attendanceTime ||
      !editedChildren.pickupPlanTime ||
      !editedChildren.pickupPerson ||
      editedChildren.takeMedicineFlg === null ||
      !editedChildren.bodyTemperature ||
      !editedChildren.conditions ||
      editedChildren.playingOutside === null ||
      editedChildren.playingWater === null
    ) {
      if (!editedChildren.absenceReason && editedChildren.stopAttendanceFlg !== null) {
        alert(
          "登園時刻・お迎え予定時間・お迎え保護者・薬の有無・体温・体調・外遊び・水遊びのいずれかが入力されていません。"
        );
        return;
      } else {
        if (
          (editedChildren.absenceReason && editedChildren.stopAttendanceFlg === null) ||
          (!editedChildren.absenceReason && editedChildren.stopAttendanceFlg !== null)
        ) {
          alert("欠席理由または出席停止が入力されていません。");
          return;
        }

        if (editedChildren.absenceReason === "その他" && !editedChildren.absenceReasonDetail) {
          alert("欠席理由詳細が入力されていません。");
          return;
        }
      }
    }

    // 非表示項目確認
    if (!isMedicationEnabled && editedChildren.takeMedicineFlg !== null) {
      const result = confirm(
        "設定では薬の有無は非表示になっています。\n薬の有無が入力されていますが、よろしいですか？"
      );
      if (!result) {
        return;
      }
    }
    if (!isWaterPlayEnabled && editedChildren.playingWater !== null) {
      const result = confirm(
        "設定では水遊びは非表示になっています。\n水遊びが入力されていますが、よろしいですか？"
      );
      if (!result) {
        return;
      }
    }

    if (editedChildren.absenceReason) {
      editedChildren.attendanceAt = date;
      editedChildren.attendanceTime = null;
      editedChildren.pickupTime = null;
      editedChildren.bodyTemperature = null;
      editedChildren.conditions = "";
      editedChildren.pickupPlanTime = "";
      editedChildren.pickupPerson = "";
      editedChildren.takeMedicineFlg = null;
      editedChildren.playingOutside = null;
      editedChildren.playingWater = null;
    } else {
      editedChildren.absenceReasonDetail = "";
      editedChildren.stopAttendanceFlg = null;

      if (editedChildren.attendanceTime) {
        editedChildren.attendanceAt = date;
      } else {
        editedChildren.attendanceAt = null;
      }
    }
    onSave(editedChildren);
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold text-gray-700 mb-4">
          {children.children.name}さんの情報編集
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {/* 左列 */}
          <div className="space-y-4">
            {/* 登園時刻 */}
            <div>
              <label className={COMMON_CLASSES.label}>登園時刻</label>
              <input
                type="time"
                value={
                  editedChildren.attendanceTime
                    ? new Date(editedChildren.attendanceTime).toLocaleTimeString("ja-JP", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""
                }
                onChange={(e) => {
                  setEditedChildren({
                    ...editedChildren,
                    attendanceTime: formatTime(e.target.value),
                  });
                }}
                className={COMMON_CLASSES.input}
              />
            </div>

            {/* 降園時刻 */}
            <div>
              <label className={COMMON_CLASSES.label}>降園時刻</label>
              <input
                type="time"
                value={
                  editedChildren.pickupTime
                    ? new Date(editedChildren.pickupTime).toLocaleTimeString("ja-JP", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""
                }
                onChange={(e) => {
                  setEditedChildren({
                    ...editedChildren,
                    pickupTime: formatTime(e.target.value),
                  });
                }}
                className={COMMON_CLASSES.input}
              />
            </div>

            {/* 体温入力 */}
            <div>
              <label className={COMMON_CLASSES.label}>体温</label>
              <input
                type="number"
                step="0.1"
                min="34.0"
                max="40.0"
                value={editedChildren.bodyTemperature || ""}
                onChange={(e) =>
                  setEditedChildren({
                    ...editedChildren,
                    bodyTemperature: parseFloat(e.target.value),
                  })
                }
                className={COMMON_CLASSES.input}
                placeholder="36.0"
              />
            </div>

            {/* 体調入力 */}
            <div>
              <label className={COMMON_CLASSES.label}>体調</label>
              <select
                value={editedChildren.conditions || ""}
                onChange={(e) =>
                  setEditedChildren({ ...editedChildren, conditions: e.target.value })
                }
                className={COMMON_CLASSES.select}
              >
                <option value="">選択してください</option>
                {conditionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* お迎え時間 */}
            <div>
              <label className={COMMON_CLASSES.label}>お迎え時間</label>
              <select
                value={editedChildren.pickupPlanTime || ""}
                onChange={(e) =>
                  setEditedChildren({ ...editedChildren, pickupPlanTime: e.target.value })
                }
                className={COMMON_CLASSES.select}
              >
                <option value="">選択してください</option>
                {times.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* お迎え者 */}
            <div>
              <label className={COMMON_CLASSES.label}>お迎え保護者</label>
              <select
                value={editedChildren.pickupPerson || ""}
                onChange={(e) =>
                  setEditedChildren({ ...editedChildren, pickupPerson: e.target.value })
                }
                className={COMMON_CLASSES.select}
              >
                <option value="">選択してください</option>
                {pickupPersonOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* 薬の有無 */}
            <div>
              <label className={COMMON_CLASSES.label}>薬の有無</label>
              <select
                value={
                  editedChildren.takeMedicineFlg === true
                    ? "true"
                    : editedChildren.takeMedicineFlg === false
                    ? "false"
                    : ""
                }
                onChange={(e) =>
                  setEditedChildren({
                    ...editedChildren,
                    takeMedicineFlg:
                      e.target.value === "true" ? true : e.target.value === "false" ? false : null,
                  })
                }
                className={COMMON_CLASSES.select}
              >
                <option value="">選択してください</option>
                <option value="true">あり</option>
                <option value="false">なし</option>
              </select>
            </div>
          </div>

          {/* 右列 */}
          <div className="space-y-4">
            {/* 外遊び */}
            <div>
              <label className={COMMON_CLASSES.label}>外遊び</label>
              <select
                value={
                  editedChildren.playingOutside === true
                    ? "true"
                    : editedChildren.playingOutside === false
                    ? "false"
                    : ""
                }
                onChange={(e) =>
                  setEditedChildren({
                    ...editedChildren,
                    playingOutside:
                      e.target.value === "true" ? true : e.target.value === "false" ? false : null,
                  })
                }
                className={COMMON_CLASSES.select}
              >
                <option value="">選択してください</option>
                <option value="true">OK</option>
                <option value="false">NG</option>
              </select>
            </div>

            {/* 水遊び */}
            <div>
              <label className={COMMON_CLASSES.label}>水遊び</label>
              <select
                value={
                  editedChildren.playingWater === true
                    ? "true"
                    : editedChildren.playingWater === false
                    ? "false"
                    : ""
                }
                onChange={(e) =>
                  setEditedChildren({
                    ...editedChildren,
                    playingWater:
                      e.target.value === "true" ? true : e.target.value === "false" ? false : null,
                  })
                }
                className={COMMON_CLASSES.select}
              >
                <option value="">選択してください</option>
                <option value="true">OK</option>
                <option value="false">NG</option>
              </select>
            </div>

            {/* 欠席理由 */}
            <div>
              <label className={COMMON_CLASSES.label}>欠席理由</label>
              <select
                value={editedChildren.absenceReason || ""}
                onChange={(e) => {
                  if (e.target.value !== "その他") {
                    setEditedChildren({
                      ...editedChildren,
                      absenceReason: e.target.value,
                      absenceReasonDetail: null,
                    });
                  } else {
                    setEditedChildren({ ...editedChildren, absenceReason: e.target.value });
                  }
                }}
                className={COMMON_CLASSES.select}
              >
                <option value="">選択してください</option>
                {absenseReasonOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* 欠席理由詳細（その他の場合のみ表示） */}
            {editedChildren.absenceReason === "その他" && (
              <div>
                <label className={COMMON_CLASSES.label}>欠席理由詳細</label>
                <textarea
                  value={editedChildren.absenceReasonDetail || ""}
                  maxLength={100}
                  onChange={(e) =>
                    setEditedChildren({
                      ...editedChildren,
                      absenceReasonDetail: e.target.value,
                    })
                  }
                  className={COMMON_CLASSES.textarea}
                  placeholder="欠席理由の詳細を入力してください"
                />
              </div>
            )}

            {/* 出席停止 */}
            <div>
              <label className={COMMON_CLASSES.label}>出席停止</label>
              <select
                value={
                  editedChildren.stopAttendanceFlg === true
                    ? "true"
                    : editedChildren.stopAttendanceFlg === false
                    ? "false"
                    : ""
                }
                onChange={(e) =>
                  setEditedChildren({
                    ...editedChildren,
                    stopAttendanceFlg:
                      e.target.value === "true" ? true : e.target.value === "false" ? false : null,
                  })
                }
                className={COMMON_CLASSES.select}
              >
                <option value="">選択してください</option>
                <option value="false">通常</option>
                <option value="true">停止中</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button onClick={onClose} variant="outline-secondary" size="md" className="flex-1">
            キャンセル
          </Button>
          <Button onClick={handleSave} variant="secondary" size="md" className="flex-1">
            保存
          </Button>
        </div>
      </div>
    </div>
  );
}
