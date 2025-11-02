import { IconType } from "react-icons";

interface NurseryButtonProps {
  icon: IconType;
  type: "admin" | "nursery";
  label: string;
  onClick: () => void;
}

export function NurseryButton({ icon: Icon, type, label, onClick }: NurseryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-96 h-36 bg-gradient-to-br ${
        type === "admin"
          ? "from-violet-400 to-violet-500 hover:from-violet-500 hover:to-violet-600"
          : "from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600"
      } 
      text-white text-2xl font-bold rounded-3xl shadow-lg 
      transform hover:scale-105 transition-all duration-200 
      flex items-center justify-center 
      border-8 border-white`}
    >
      <div className="text-center">
        <Icon className="mx-auto text-5xl mb-4" />
        {label}
      </div>
    </button>
  );
}
