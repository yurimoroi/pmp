"use client";

import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import "@/lib/amplifyConfig";

export default function Home() {
  const [message, setMessage] = useState("");

  const fetchMessage = async () => {
    console.log("fetchMessage");
    const response = await fetch("https://4duvwc9h43.execute-api.ap-northeast-1.amazonaws.com/dev/sampleLambda");
    console.log(response);
    const data = await response.json();
    console.log(data);
    setMessage(data);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await fetchAuthSession();
        console.log(session);
        const idToken = session.tokens?.idToken?.payload;
        console.log(idToken);

        if (idToken?.email) {
          fetchMessage();
        } else {
          alert("未ログイン");
        }
      } catch {
        alert("セッションなし");
      }
    };

    checkAuth();
  }, []);

  return (
    <main style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={fetchMessage} className="bg-blue-500 text-white p-2 rounded-md">
        Fetch Message
      </button>
      <h1>Amplify → API Gateway → Lambda 疎通確認</h1>
      <p>{message ? `API応答: ${message}` : "通信中..."}</p>
    </main>
  );
}
