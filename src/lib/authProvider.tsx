"use client";

import { Amplify } from "aws-amplify";
import { amplifyConfig } from "@/lib/amplifyConfig";
import { Authenticator } from "@aws-amplify/ui-react";
import type { ReactNode } from "react";

Amplify.configure(amplifyConfig, { ssr: true });

export const AmplifyProvider = ({ children }: { children: ReactNode }) => {
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
};
