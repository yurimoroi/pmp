"use client";

import { useState } from "react";

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
