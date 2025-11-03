"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchAuthSession, fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

type UserInfo = {
  email?: string;
  name?: string;
  sub?: string;
  group?: string;
  nickname?: string;
};

type UserContextType = {
  user: UserInfo | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        await getCurrentUser();
        const attributes = await fetchUserAttributes();
        const session = await fetchAuthSession();
        const idToken = session.tokens?.idToken;
        const payload = idToken?.payload;
        const userGroups = payload?.["cognito:groups"] || [];
        const group = userGroups ? (userGroups as string[])[0] : undefined;
        setUser({ ...attributes, group });
      } catch (error) {
        console.error("ユーザー情報の取得に失敗しました:", error);
        setUser(null);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [router]);

  return <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
