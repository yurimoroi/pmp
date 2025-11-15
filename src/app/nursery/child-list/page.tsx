"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useUser } from "@/context/userContext";
import { getNurseryClassName } from "@/utility/nursery";
import { Children } from "@/types/child-list";
import EditModal from "@/components/child-list/EditModal";
import ConditionTable from "@/components/child-list/CondtionTable";
import Filter from "@/components/child-list/Filter";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

export default function ChildListPage() {
  const { user } = useUser();
  const nurseryName = user?.nickname || "";
  const router = useRouter();

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
      const filteredChildren = children.filter((child) => child.absenceReason !== null || child.attendanceTime !== null);
      const response = await fetch("https://4duvwc9h43.execute-api.ap-northeast-1.amazonaws.com/dev/children/attendances-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          children: filteredChildren,
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

        const body = await response.json();
        throw new Error(body.message);
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
      const response = await fetch("https://4duvwc9h43.execute-api.ap-northeast-1.amazonaws.com/dev/nursery/settings-get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          nurseryName,
        }),
      });

      const body = await response.json();
      if (response.status !== 200) {
        if (response.status === 401) {
          alert("セッションが切れました。再度ログインしてください。");
          signOut();
          router.push("/login");
          return;
        }

        throw new Error(body.message);
      }
      setIsWaterPlayEnabled(body.playingWaterDisplayFlg);
      setIsMedicationEnabled(body.takeMedicineDisplayFlg);
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
          router={router}
          token={user?.token}
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
