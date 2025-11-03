"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAuthSession, signIn, signOut } from "aws-amplify/auth";
import { SIGN_IN_STEP } from "@/lib/signInStep";
import "@/lib/amplifyConfig";
import { loginLocation } from "@/lib/loginLocation";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    userId: "",
    password: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await signIn({ username: credentials.userId, password: credentials.password });
      console.log(result);

      switch (result.nextStep.signInStep) {
        case SIGN_IN_STEP.DONE:
          const result = await loginLocation(router);
          if (!result) {
            setError("権限がありません。Cognitoのグループを確認してください。");
            setLoading(false);
            signOut();
            return;
          }
          break;
        case SIGN_IN_STEP.CONFIRM_SIGN_UP:
          setError("ユーザー登録が未完了です");
          break;
        case SIGN_IN_STEP.RESET_PASSWORD:
          router.push("/reset");
          break;
        case SIGN_IN_STEP.CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED:
          router.push("/reset");
          break;
        default:
          setError("ログインに失敗しました");
          break;
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("ログインに失敗しました");
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
          <p className="mt-2 text-center text-sm text-gray-600">ログインしてください</p>
        </div>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                ユーザーID
              </label>
              <input
                id="userId"
                name="userId"
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                value={credentials.userId}
                onChange={(e) => setCredentials({ ...credentials, userId: e.target.value })}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                パスワード
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
              {loading ? "ログイン中..." : "ログイン"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
