"use client";

import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "ap-northeast-1_AP1FB3AyT",
      userPoolClientId: "6v5j434nrlk0brkrl9v0fcd25k",
    },
  },
});
