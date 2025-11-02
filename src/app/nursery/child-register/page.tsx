"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { getNurseryClassName } from "@/utility/nursery";
import { ResponseChildren } from "@/types/api/response";
import { ApiResponse, handleApiError } from "@/utility/api/apiHelper";
import { Button } from "@/components/common/Button";

export default function ChildRegisterPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const nurseryName = session?.user?.nursery || "";

  const [childId, setChildId] = useState("");
  const [className, setClassName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [admissionAt, setAdmissionAt] = useState(format(new Date(), "yyyy-MM-dd"));
  const [leavingAt, setLeavingAt] = useState("");
  const [classes, setClasses] = useState<string[]>([]);

  const emptyForm = () => {
    setChildId("");
    setClassName("");
    setLastName("");
    setFirstName("");
    setAdmissionAt(format(new Date(), "yyyy-MM-dd"));
    setLeavingAt("");
  };

  // 園児データを取得する関数
  const fetchChildData = async (id: string, firstName: string, lastName: string, className: string) => {
    if (className && (firstName === "" || lastName === "")) {
      alert("クラスを指定する場合は、名前を入力してください。");
      return;
    }

    try {
      let responseData: ApiResponse<ResponseChildren>;

      if (id) {
        const response = await fetch(`/api/children/search/${id}`);
        if (!response.ok) {
          emptyForm();

          if (response.status === 404) {
            alert("該当する園児がいません。");
            return;
          }

          handleApiError(response);
          throw new Error("データの取得に失敗しました");
        }
        responseData = await response.json();
      } else {
        const response = await fetch(
          `/api/children/search?name=${encodeURIComponent(`${lastName}　${firstName}`)}&className=${encodeURIComponent(className)}&nursery=${encodeURIComponent(nurseryName)}`
        );
        if (!response.ok) {
          emptyForm();

          if (response.status === 404) {
            alert("該当する園児がいません。");
            return;
          }

          handleApiError(response);
          throw new Error("データの取得に失敗しました");
        }
        responseData = await response.json();
      }
      if (!responseData.data) {
        throw new Error("データの取得に失敗しました");
      }

      // 取得したデータをフォームにセット
      setChildId(responseData.data.childId.toString());
      setClassName(responseData.data.className);
      // 姓名を分割
      const [last = "", first = ""] = responseData.data.name.split(/　/);
      setLastName(last);
      setFirstName(first);
      setAdmissionAt(format(new Date(responseData.data.admissionAt), "yyyy-MM-dd"));
      if (responseData.data.leavingAt) {
        setLeavingAt(format(new Date(responseData.data.leavingAt), "yyyy-MM-dd"));
      }
    } catch (error) {
      console.error("データの取得に失敗しました:", error);
      alert("データの取得に失敗しました。");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!nurseryName) return;
        const classNames = await getNurseryClassName(nurseryName);
        setClasses(classNames);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };
    fetchData();
  }, [nurseryName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!lastName || !firstName) {
      alert("名前を入力してください。");
      return;
    }

    if (!className) {
      alert("クラスを選択してください。");
      return;
    }

    if (!admissionAt) {
      alert("入園日を入力してください。");
      return;
    }

    try {
      if (childId) {
        const response = await fetch(`/api/children`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            childId,
            nurseryName,
            className,
            lastName,
            firstName,
            admissionAt,
            leavingAt: leavingAt || null,
          }),
        });

        if (!response.ok) {
          handleApiError(response);
          throw new Error("更新に失敗しました");
        }
      } else {
        const response = await fetch("/api/children", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nurseryName,
            className,
            lastName,
            firstName,
            admissionAt,
            leavingAt: leavingAt || null,
          }),
        });

        if (!response.ok) {
          handleApiError(response);
          throw new Error("登録に失敗しました");
        }
      }

      alert(childId ? "園児情報を更新しました" : "園児情報を登録しました");
    } catch (error) {
      console.error("エラーが発生しました:", error);
      alert("処理に失敗しました。もう一度お試しください。");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex items-center">
      <main className="w-full max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-8 text-center">園児登録</h1>
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="bg-white rounded-2xl p-8 border-4 border-gray-100 space-y-6">
          <div>
            <label className="block text-sm text-gray-500 mb-2">園児番号</label>
            <input type="text" value={childId} onChange={(e) => setChildId(e.target.value)} className="w-full p-2 rounded-xl border-2 border-gray-100 focus:border-violet-400 focus:outline-none" />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-500 mb-2">名前（姓）</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 rounded-xl border-2 border-gray-100 focus:border-violet-400 focus:outline-none"
                minLength={1}
                maxLength={10}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-500 mb-2">名前（名）</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 rounded-xl border-2 border-gray-100 focus:border-violet-400 focus:outline-none"
                minLength={1}
                maxLength={40}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">クラス</label>
            <select value={className} onChange={(e) => setClassName(e.target.value)} className="w-full p-2 rounded-xl border-2 border-gray-100 focus:border-violet-400 focus:outline-none" required>
              <option value="">選択してください</option>
              {classes.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>

          {/* 薄い線と検索ボタン */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <button
                type="button"
                onClick={() => fetchChildData(childId, firstName, lastName, className)}
                disabled={!childId && !firstName && !lastName && !className}
                className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
              >
                検索
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">入園日</label>
            <input
              type="date"
              value={admissionAt}
              onChange={(e) => setAdmissionAt(e.target.value)}
              className="w-full p-2 rounded-xl border-2 border-gray-100 focus:border-violet-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">退園日</label>
            <input type="date" value={leavingAt} onChange={(e) => setLeavingAt(e.target.value)} className="w-full p-2 rounded-xl border-2 border-gray-100 focus:border-violet-400 focus:outline-none" />
          </div>

          <div className="flex gap-4 mt-8">
            <Button type="button" onClick={() => router.back()} variant="outline-secondary" size="md" className="flex-1">
              戻る
            </Button>
            <Button type="submit" variant="secondary" size="md" className="flex-1">
              登録
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
