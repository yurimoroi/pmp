"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useUser } from "@/context/userContext";
import { getNurseryClassName } from "@/utility/nursery";
import { Button } from "@/components/common/Button";
import { signOut } from "aws-amplify/auth";

export default function ChildRegisterPage() {
  const router = useRouter();
  const { user } = useUser();
  const nurseryName = user?.nickname;

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
      const response = await fetch(`https://4duvwc9h43.execute-api.ap-northeast-1.amazonaws.com/dev/children/search-get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          nurseryName: nurseryName,
          className: className,
          childId: id,
          name: `${lastName} ${firstName}`,
        }),
      });

      if (response.status !== 200) {
        if (response.status === 401) {
          alert("セッションが切れました。再度ログインしてください。");
          signOut();
          router.push("/login");
          return;
        }

        emptyForm();
        const body = await response.json();
        if (response.status === 404) {
          alert(body.message);
          return;
        }
        throw new Error(body.message);
      }

      const responseData = await response.json();
      // 取得したデータをフォームにセット
      setChildId(responseData.childId);
      setClassName(responseData.className);
      // 姓名を分割
      const [last = "", first = ""] = responseData.name.split(/ /);
      setLastName(last);
      setFirstName(first);
      setAdmissionAt(format(new Date(responseData.admissionAt), "yyyy-MM-dd"));
      if (responseData.leavingAt) {
        setLeavingAt(format(new Date(responseData.leavingAt), "yyyy-MM-dd"));
      }
    } catch (error) {
      console.error("データの取得に失敗しました:", error);
      alert((error as Error).message || "データの取得に失敗しました。");
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
        const response = await fetch("https://4duvwc9h43.execute-api.ap-northeast-1.amazonaws.com/dev/children/put", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            childId,
            className,
            name: `${lastName} ${firstName}`,
            admissionAt,
            leavingAt: leavingAt || null,
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
      } else {
        const response = await fetch("https://4duvwc9h43.execute-api.ap-northeast-1.amazonaws.com/dev/children/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            nurseryName,
            className,
            name: `${lastName} ${firstName}`,
            admissionAt,
            leavingAt: leavingAt || null,
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
