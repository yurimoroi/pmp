"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { confirmSignIn, fetchAuthSession, signOut } from "aws-amplify/auth";
import { SIGN_IN_STEP } from "@/lib/signInStep";
import "@/lib/amplifyConfig";
import { loginLocation } from "@/lib/loginLocation";

const ResetPasswordPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    // 新しいパスワードと確認パスワードの一致確認
    if (credentials.newPassword !== credentials.confirmPassword) {
      setError("新しいパスワードと確認パスワードが一致しません");
      return;
    }

    // パスワードの最小要件チェック（必要に応じてカスタマイズ）
    if (credentials.newPassword.length < 8) {
      setError("新しいパスワードは8文字以上である必要があります");
      return;
    }

    setLoading(true);
    try {
      await confirmSignIn({
        challengeResponse: credentials.newPassword,
        options: {
          signInStep: SIGN_IN_STEP.CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED,
        },
      });
      setLoading(false);
      const result = await loginLocation(router);
      if (!result) {
        setError("権限がありません。Cognitoのグループを確認してください。");
        signOut();
        return;
      }
    } catch (error) {
      console.error(error);
      setError("パスワードの変更に失敗しました。現在のパスワードが正しいか確認してください");
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const session = await fetchAuthSession();
      if (session.tokens?.idToken) {
        router.push("/");
      }
    };
    checkAuth();
  }, [router]);

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">職員管理システム</h2>
          <p className="mt-2 text-center text-sm text-gray-600">パスワードを変更してください</p>
        </div>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                現在のパスワード
              </label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                value={credentials.currentPassword}
                onChange={(e) => setCredentials({ ...credentials, currentPassword: e.target.value })}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                新しいパスワード
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                value={credentials.newPassword}
                onChange={(e) => setCredentials({ ...credentials, newPassword: e.target.value })}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                確認パスワード
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                value={credentials.confirmPassword}
                onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white cursor-pointer hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "変更中..." : "パスワードを変更"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
