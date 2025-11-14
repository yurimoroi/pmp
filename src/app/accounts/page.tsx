"use client";

import { useUser } from "@/context/userContext";
import { signOut } from "aws-amplify/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Account = {
  userId: string;
  name: string;
  role: "管理者" | "編集者" | "閲覧者" | "保育園";
  nursery: string;
  updateFlag: boolean;
};

type EditAccount = Account & {
  password: string;
};

const roles = ["管理者", "編集者", "閲覧者", "保育園"] as const;
const kindergartens = ["まつばら園", "しもばやし園", "なかじま園"] as const;

export default function AccountsPage() {
  const { user } = useUser();
  const router = useRouter();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<EditAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchAccounts = async () => {
    try {
      const response = await fetch("https://4duvwc9h43.execute-api.ap-northeast-1.amazonaws.com/dev/accounts-get", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (response.status !== 200) {
        if (response.status === 401) {
          alert("セッションが切れました。再度ログインしてください。");
          signOut();
          router.push("/login");
          return;
        }
        throw new Error("データの取得に失敗しました");
      }

      const data = await response.json();
      setAccounts(data);
      setIsLoading(false);
    } catch (error) {
      console.error("データの取得に失敗しました:", error);
      alert("データの取得に失敗しました");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedAccounts(accounts.map((account) => account.userId));
    } else {
      setSelectedAccounts([]);
    }
  };

  const handleSelectAccount = (userId: string) => {
    setSelectedAccounts((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((accountUserId) => accountUserId !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleRegister = () => {
    setEditingAccount({
      userId: "",
      name: "",
      password: "",
      role: "閲覧者",
      nursery: "",
      updateFlag: false,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = async () => {
    if (selectedAccounts.length === 0) {
      setDeleteError("削除するアカウントを選択してください。");
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch("https://4duvwc9h43.execute-api.ap-northeast-1.amazonaws.com/dev/accounts-delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          usernames: selectedAccounts,
        }),
      });
      if (response.status !== 200) {
        if (response.status === 401) {
          alert("セッションが切れました。再度ログインしてください。");
          signOut();
          router.push("/login");
          return;
        }
        throw new Error("データの削除に失敗しました");
      }

      setSelectedAccounts([]);
      setIsDeleting(false);
      fetchAccounts();
    } catch (error) {
      console.error("データの削除に失敗しました:", error);
      setIsDeleting(false);
    }
  };

  const handleRowClick = (account: Account) => {
    setEditingAccount({
      ...account,
      password: "",
      updateFlag: true,
    });
    setIsModalOpen(true);
  };

  const handleEditAccountChange = (field: keyof EditAccount, value: string) => {
    if (!editingAccount) return;

    setEditingAccount((prev) => {
      if (!prev) return prev;
      if (field === "role") {
        const newRole = value as Account["role"];
        return {
          ...prev,
          [field]: newRole,
          nursery: newRole !== "保育園" ? "" : prev.nursery,
        };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleSave = async () => {
    if (!editingAccount) return;
    try {
      if (!editingAccount.updateFlag) {
        const response = await fetch("https://4duvwc9h43.execute-api.ap-northeast-1.amazonaws.com/dev/accounts-post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            username: editingAccount.userId,
            name: editingAccount.name,
            password: editingAccount.password,
            nickname: editingAccount.nursery,
            group: editingAccount.role,
          }),
        });

        if (response.status !== 201) {
          if (response.status === 401) {
            alert("セッションが切れました。再度ログインしてください。");
            signOut();
            router.push("/login");
            return;
          }
          throw new Error("データの登録に失敗しました");
        }

        fetchAccounts();
      } else {
        const response = await fetch("https://4duvwc9h43.execute-api.ap-northeast-1.amazonaws.com/dev/accounts-put", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            username: editingAccount.userId,
            name: editingAccount.name,
            password: editingAccount?.password ? editingAccount.password : "",
            nickname: editingAccount.nursery,
            group: editingAccount.role,
          }),
        });

        if (response.status !== 200) {
          if (response.status === 401) {
            alert("セッションが切れました。再度ログインしてください。");
            signOut();
            router.push("/login");
            return;
          }
          throw new Error("データの更新に失敗しました");
        }
      }

      setIsModalOpen(false);
      setEditingAccount(null);
      fetchAccounts();
    } catch (error) {
      console.error("データの保存に失敗しました:", error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">アカウント管理</h1>
        <div className="space-x-4">
          <button
            onClick={handleRegister}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            disabled={isDeleting}
          >
            登録
          </button>
          <button
            onClick={handleDeleteClick}
            className="px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <span className="inline-block animate-spin mr-2">⚪</span>
                削除中...
              </>
            ) : (
              "削除"
            )}
          </button>
        </div>
      </div>

      {deleteError && <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">{deleteError}</div>}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-orange-50">
              <tr>
                <th className="w-12 px-4 py-3">
                  <input type="checkbox" onChange={handleSelectAll} checked={selectedAccounts.length === accounts.length} className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ユーザーID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">名前</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">権限</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">保育園コード</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {accounts.map((account) => (
                <tr key={account.userId} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleRowClick(account)}>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedAccounts.includes(account.userId)}
                      onChange={() => handleSelectAccount(account.userId)}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{account.userId}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{account.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{account.role}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{account.nursery}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && editingAccount && (
        <div className="fixed inset-0 bg-gray-500/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">{accounts.find((a) => a.userId === editingAccount.userId) ? "アカウント編集" : "アカウント登録"}</h2>
            <div className="space-y-4">
              {!accounts.find((a) => a.userId === editingAccount.userId) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">ユーザーID</label>
                  <input
                    type="text"
                    value={editingAccount.userId}
                    onChange={(e) => handleEditAccountChange("userId", e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">名前</label>
                <input
                  type="text"
                  value={editingAccount.name}
                  onChange={(e) => handleEditAccountChange("name", e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">パスワード</label>
                <input
                  type="password"
                  value={editingAccount.password}
                  onChange={(e) => handleEditAccountChange("password", e.target.value)}
                  placeholder="変更する場合のみ入力"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">権限</label>
                <select
                  value={editingAccount.role}
                  onChange={(e) => handleEditAccountChange("role", e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              {editingAccount.role === "保育園" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">保育園コード</label>
                  <select
                    value={editingAccount.nursery}
                    onChange={(e) => handleEditAccountChange("nursery", e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                  >
                    <option value="">-</option>
                    {kindergartens.map((kindergarten) => (
                      <option key={kindergarten} value={kindergarten}>
                        {kindergarten}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingAccount(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                キャンセル
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
