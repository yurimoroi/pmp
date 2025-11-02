"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useUser } from "@/context/userContext";
import { getNurseryClassName } from "@/utility/nursery";
import { Children } from "@/types/child-list";
import EditModal from "@/components/child-list/EditModal";
// import { handleApiError } from "@/utility/api/apiHelper";
import ConditionTable from "@/components/child-list/CondtionTable";
import Filter from "@/components/child-list/Filter";

export default function ChildListPage() {
  const { user } = useUser();
  const nurseryName = user?.nickname || "";

  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [editingChildren, setEditingChildren] = useState<Children | null>(null);
  const [classes, setClasses] = useState<string[]>([]);
  const [children, setChildren] = useState<Children[]>([]);
  const [isWaterPlayEnabled, setIsWaterPlayEnabled] = useState<boolean>(false);
  const [isMedicationEnabled, setIsMedicationEnabled] = useState<boolean>(false);

  const handleSave = (updatedChildren: Children) => {
    const updatedChildrenList = children.map((child) => (child.childId === updatedChildren.childId ? updatedChildren : child));
    setChildren(updatedChildrenList);
    setEditingChildren(null);
  };

  const handleSaveAll = async () => {
    try {
      const response = await fetch("/api/children/attendances", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          children,
          date: selectedDate,
        }),
      });

      if (!response.ok) {
        // handleApiError(response);
        throw new Error("登録に失敗しました");
      }

      alert("更新が完了しました。");
    } catch (error) {
      console.error("エラーが発生しました:", error);
      alert("処理に失敗しました。もう一度お試しください。");
      return;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!nurseryName) return;
        const classNames = await getNurseryClassName(nurseryName);
        setClasses(classNames);
        setSelectedClass(classNames[0]);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };

    const fetchSettings = async () => {
      const response = await fetch(`/api/nursery/settings?nursery=${nurseryName}`);
      const data = await response.json();
      setIsWaterPlayEnabled(data.data.playingWaterDisplayFlg);
      setIsMedicationEnabled(data.data.takeMedicineDisplayFlg);
    };

    fetchData();
    fetchSettings();
  }, [nurseryName]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <main className="mx-auto p-6 max-w-7xl">
        <h1 className="text-2xl font-bold text-gray-700 mb-8">園児一覧</h1>

        {/* フィルター */}
        <Filter
          nurseryName={nurseryName}
          setChildren={setChildren}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          classes={classes}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          handleSaveAll={handleSaveAll}
        />

        {/* 園児一覧テーブル */}
        <ConditionTable setEditingChildren={setEditingChildren}>{children}</ConditionTable>

        {/* 編集モーダル */}
        {editingChildren && (
          <EditModal isWaterPlayEnabled={isWaterPlayEnabled} isMedicationEnabled={isMedicationEnabled} date={new Date(selectedDate)} onSave={handleSave} onClose={() => setEditingChildren(null)}>
            {editingChildren}
          </EditModal>
        )}
      </main>
    </div>
  );
}
