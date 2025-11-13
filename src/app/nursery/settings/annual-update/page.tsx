"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/userContext";
import { getNurseryClassName, getNurseryNextClassName } from "@/utility/nursery";
import { AnnualUpdateChildren } from "@/types/annualUpdateChildren";
import AnnualUpdateFilter from "@/components/annualUpdate/AnnualUpdateFilter";
import AnnualUpdateTable from "@/components/annualUpdate/AnnualUpdateTable";

export default function GraduatePage() {
  const { user } = useUser();
  const nurseryName = user?.nickname || "";

  const [selectedClass, setSelectedClass] = useState<string>("");
  const [annualUpdateChildren, setAnnualUpdateChildren] = useState<AnnualUpdateChildren[]>([]);
  const [classes, setClasses] = useState<string[]>([]);
  const [nextClasses, setNextClasses] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const getNextClassName = async (className: string) => {
    // 次のクラス名を取得
    const nextclassName = await getNurseryNextClassName(nurseryName, className);
    if (nextclassName[0] === className) {
      nextclassName[0] = "卒園";
    } else {
      nextclassName.push("卒園");
    }

    setNextClasses(nextclassName);
  };

  const handleAnnualUpdate = async () => {
    if (annualUpdateChildren.length === 0) {
      alert("年次更新対象の園児がいません。");
      return;
    }

    const result = confirm("年次更新を行いますか？\n年次更新を行うと、園児の情報が更新されます。\n園長に確認の上、年次更新を行ってください。");
    if (!result) return;

    setIsProcessing(true);

    try {
      const response = await fetch("https://4duvwc9h43.execute-api.ap-northeast-1.amazonaws.com/dev/nursery/annual-updates-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nurseryName,
          children: annualUpdateChildren,
          year: new Date().getFullYear(),
        }),
      });

      if (response.status !== 200) {
        const body = await response.json();
        throw new Error(body.message);
      }

      alert(`${selectedClass}クラスの年次更新が完了しました。`);
      setIsProcessing(false);
      setAnnualUpdateChildren([]);
    } catch (error) {
      console.error("年次更新中にエラーが発生しました:", error);
      alert((error as Error).message || "年次更新中にエラーが発生しました。もう一度お試しください。");
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const fetchNextClassNameData = async () => {
      try {
        if (!nurseryName) return;
        // クラス名一覧を取得
        const classNames = await getNurseryClassName(nurseryName);

        setClasses(classNames);
        setSelectedClass(classNames[0]);
        getNextClassName(classNames[0]);

        if (!classNames) return;
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };

    fetchNextClassNameData();
  }, [nurseryName]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <main className="mx-auto p-6 max-w-7xl">
        <h1 className="text-2xl font-bold text-gray-700 mb-8">年次更新</h1>

        {/* フィルター */}
        <AnnualUpdateFilter
          nurseryName={nurseryName}
          getNextClassName={getNextClassName}
          setAnnualUpdateChildren={setAnnualUpdateChildren}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          classes={classes}
          nextClasses={nextClasses}
          handleAnnualUpdate={handleAnnualUpdate}
          isProcessing={isProcessing}
        />

        {/* 卒園対象園児テーブル */}
        <AnnualUpdateTable annualUpdateChildren={annualUpdateChildren} setAnnualUpdateChildren={setAnnualUpdateChildren} classes={classes} />
      </main>
    </div>
  );
}
