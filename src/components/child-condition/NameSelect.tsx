import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { handleApiError } from "@/utility/api/apiHelper";

interface NameSelectProps {
  className: string;
  onSelect: (childId: number, name: string) => void;
  mode?: "checkin" | "checkout" | "absence";
}

export function NameSelect({ className, onSelect, mode = "checkin" }: NameSelectProps) {
  const { data: session } = useSession();
  const nurseryName = session?.user?.nursery || "";

  const [childList, setChildList] = useState<{ childId: number; name: string }[]>([]);

  useEffect(() => {
    const fetchChildData = async () => {
      try {
        const response = await fetch(
          `/api/children/names?nursery=${encodeURIComponent(
            nurseryName
          )}&className=${encodeURIComponent(className)}`
        );

        if (!response.ok) {
          handleApiError(response);
          throw new Error("データの取得に失敗しました");
        }

        const responseData = await response.json();
        setChildList(responseData.data.map((child: { childId: number; name: string }) => child));
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };
    fetchChildData();
  }, [nurseryName, className]);

  const getGradientClasses = () => {
    if (mode === "absence") {
      return "from-violet-100 to-violet-50 hover:from-violet-200 hover:to-violet-100 focus:ring-violet-200";
    }
    return "from-orange-100 to-orange-50 hover:from-orange-200 hover:to-orange-100 focus:ring-orange-200";
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {childList.map((child) => (
        <button
          key={child.childId}
          onClick={() => onSelect(child.childId, child.name)}
          className={`aspect-square bg-gradient-to-r
          rounded-3xl shadow-md hover:shadow-lg
          transform hover:scale-105 transition-all duration-200
          border-4 border-white
          text-lg font-bold text-gray-700
          focus:outline-none focus:ring-4
          flex items-center justify-center p-4 ${getGradientClasses()}`}
        >
          <span className="text-center break-all">{child.name}</span>
        </button>
      ))}
    </div>
  );
}
