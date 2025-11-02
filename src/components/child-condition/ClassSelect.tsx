import { useEffect, useState } from "react";
import { getNurseryClassName } from "@/utility/nursery";
import { useSession } from "next-auth/react";

interface ClassSelectProps {
  onSelect: (className: string) => void;
  mode?: "checkin" | "checkout" | "absence";
}

export function ClassSelect({ onSelect, mode = "checkin" }: ClassSelectProps) {
  const [classList, setClassList] = useState<string[]>([]);
  const { data: session } = useSession();
  const nurseryName = session?.user?.nursery;

  useEffect(() => {
    const fetchClasses = async () => {
      if (!nurseryName) return;
      const classes = await getNurseryClassName(nurseryName);
      setClassList(classes);
    };
    fetchClasses();
  }, [nurseryName]);

  const getGradientClasses = () => {
    if (mode === "absence") {
      return "from-violet-100 to-violet-50 hover:from-violet-200 hover:to-violet-100 focus:ring-violet-200";
    }
    return "from-orange-100 to-orange-50 hover:from-orange-200 hover:to-orange-100 focus:ring-orange-200";
  };

  return (
    <div className="space-y-4">
      {classList.map((className) => (
        <button
          key={className}
          onClick={() => onSelect(className)}
          className={`w-full py-6 px-8 bg-gradient-to-r
          rounded-3xl shadow-md hover:shadow-lg
          transform hover:scale-102 transition-all duration-200
          border-4 border-white
          text-xl font-bold text-gray-700
          focus:outline-none focus:ring-4 ${getGradientClasses()}`}
        >
          {className}
        </button>
      ))}
    </div>
  );
}
