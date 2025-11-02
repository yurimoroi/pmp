"use client";

import { useEffect, useState } from "react";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { useUser } from "@/context/userContext";
import { signOut } from "aws-amplify/auth";

import { useRouter } from "next/navigation";
import { FullColorButton } from "@/components/common/Button";

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useUser();
  const nurseryName = user?.nickname;

  const [waterPlayEnabled, setWaterPlayEnabled] = useState(false);
  const [medicationEnabled, setMedicationEnabled] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleWaterPlayToggle = () => {
    setWaterPlayEnabled(!waterPlayEnabled);
    setIsDirty(true);
  };

  const handleMedicationToggle = () => {
    setMedicationEnabled(!medicationEnabled);
    setIsDirty(true);
  };

  const handleSave = async () => {
    if (!nurseryName) return;

    try {
      setIsSaving(true);

      const settings = {
        nurseryName,
        playingWaterDisplayFlg: waterPlayEnabled,
        takeMedicineDisplayFlg: medicationEnabled,
      };

      // 設定を保存
      const saveResponse = await fetch("/api/nursery/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      if (!saveResponse.ok) {
        throw new Error("設定の保存に失敗しました");
      }

      setIsDirty(false);
    } catch (error) {
      console.error("設定の保存中にエラーが発生しました:", error);
      alert("設定の保存中にエラーが発生しました。もう一度お試しください。");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("ログアウトに失敗しました:", error);
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await fetch(`/api/nursery/settings?nursery=${nurseryName}`);
      const data = await response.json();
      setWaterPlayEnabled(data.data.playingWaterDisplayFlg);
      setMedicationEnabled(data.data.takeMedicineDisplayFlg);
    };

    fetchSettings();
  }, [nurseryName]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <main className="max-w-xl mx-auto p-6">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">表示設定</h1>

          <ToggleSwitch label="水遊びの表示" isEnabled={waterPlayEnabled} onToggle={handleWaterPlayToggle} />

          <ToggleSwitch label="お薬の有無の表示" isEnabled={medicationEnabled} onToggle={handleMedicationToggle} />

          <div className="pt-6">
            <FullColorButton onClick={handleSave} disabled={!isDirty || isSaving} variant={isDirty && !isSaving ? "blue" : "gray"} className="w-full">
              {isSaving ? "保存中..." : "保存"}
            </FullColorButton>
          </div>

          <div className="pt-4">
            <FullColorButton onClick={() => router.push("/nursery/settings/annual-update")} variant="orange" className="w-full">
              年次更新
            </FullColorButton>
          </div>

          <div className="pt-4">
            <FullColorButton onClick={handleLogout} variant="red" className="w-full">
              ログアウト
            </FullColorButton>
          </div>
        </div>
      </main>
    </div>
  );
}
