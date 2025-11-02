"use client";

import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { NurseryButton } from "@/components/NurseryButton";
import { useRouter } from "next/navigation";

export default function NurseryPage() {
  const router = useRouter();

  const handleCheckIn = () => {
    const params = new URLSearchParams({
      mode: "checkin",
    });
    router.push(`/nursery/child-condition?${params.toString()}`);
  };

  const handleCheckOut = () => {
    const params = new URLSearchParams({
      mode: "checkout",
    });
    router.push(`/nursery/child-condition?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex items-center">
      <main className="w-full max-w-xl mx-auto p-6">
        <div className="flex flex-col items-center space-y-8">
          <NurseryButton icon={FaSignInAlt} type="nursery" label="登園" onClick={handleCheckIn} />

          <NurseryButton icon={FaSignOutAlt} type="nursery" label="降園" onClick={handleCheckOut} />
        </div>
      </main>
    </div>
  );
}
