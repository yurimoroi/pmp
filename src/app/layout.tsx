import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RootLayoutClient } from "@/components/layout/RootLayoutClient";
import "./globals.css";
import { AmplifyProvider } from "@/lib/authProvider";

const inter = Inter({ subsets: ["latin"] });

// const cognitoAuthConfig = {
//   authority: "https://cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_AP1FB3AyT",
//   client_id: "6v5j434nrlk0brkrl9v0fcd25k",
//   redirect_uri: "https://d84l1y8p4kdic.cloudfront.net",
//   response_type: "code",
//   scope: "phone openid email",
// };

export const metadata: Metadata = {
  title: "職員管理システム",
  description: "保育園の職員管理システム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <RootLayoutClient>
          <AmplifyProvider>{children}</AmplifyProvider>
        </RootLayoutClient>
      </body>
    </html>
  );
}

