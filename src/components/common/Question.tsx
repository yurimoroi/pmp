import { usePathname } from "next/navigation";
import { FaCircleQuestion } from "react-icons/fa6";

interface QuestionProps {
  onOpen: () => void;
}

const supportDisplay = [
  "/nursery/admin",
  "/nursery/child-list",
  "/nursery/child-register",
  "/nursery/settings",
];

export function Question({ onOpen }: QuestionProps) {
  const pathname = usePathname();
  const isSupportDisplay = supportDisplay.includes(pathname);

  return (
    <div
      className={`fixed bottom-4 right-4 cursor-pointer ${isSupportDisplay ? "block" : "hidden"}`}
      onClick={onOpen}
    >
      <FaCircleQuestion className="w-10 h-10 text-violet-500" />
    </div>
  );
}
