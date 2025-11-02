"use client";

import { ResourcesConfig } from "aws-amplify";

export const amplifyConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.USER_POOL_ID ?? "ap-northeast-1_AP1FB3AyT",
      userPoolClientId: process.env.USER_POOL_CLIENT_ID ?? "6v5j434nrlk0brkrl9v0fcd25k",
    },
  },
};
