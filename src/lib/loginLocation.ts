import { fetchAuthSession, signOut } from "aws-amplify/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const loginLocation = async (router: AppRouterInstance) => {
  const session = await fetchAuthSession();
  const payload = session.tokens?.idToken?.payload;
  const userGroups = payload?.["cognito:groups"] || [];
  const role = userGroups ? (userGroups as string[])[0] : undefined;
  if (role === "保育園") {
    router.push("/nursery");
  } else if (role === "管理者" || role === "編集者" || role === "閲覧者") {
    router.push("/");
  } else {
    signOut();
    return false;
  }
  return true;
};
