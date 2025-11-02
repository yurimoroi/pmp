import { useEffect, useState } from "react";
import { HealthCheckFormModal } from "@/components/admin/HealthCheckFormModal";
import { AttendanceFormModal } from "@/components/admin/AttendanceFormModal";
import { getNurseryClassName } from "@/utility/nursery";
import { useSession } from "next-auth/react";
import { FaHeartbeat, FaUsers } from "react-icons/fa";

interface ReportModalProps {
  onClose: () => void;
}

export function ReportModal({ onClose }: ReportModalProps) {
  const { data: session } = useSession();
  const nurseryName = session?.user?.nursery;

  const [showHealthCheckForm, setShowHealthCheckForm] = useState(false);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [classes, setClasses] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!nurseryName) return;
        const classNames = await getNurseryClassName(nurseryName);
        setClasses(classNames);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };
    fetchData();
  }, [nurseryName]);

  const handleHealthCheck = () => {
    setShowHealthCheckForm(true);
  };

  const handleAttendanceReport = () => {
    setShowAttendanceForm(true);
  };

  if (showHealthCheckForm) {
    return (
      <HealthCheckFormModal
        nurseryName={nurseryName || ""}
        classes={classes}
        onClose={() => setShowHealthCheckForm(false)}
      />
    );
  }

  if (showAttendanceForm) {
    return (
      <AttendanceFormModal
        nurseryName={nurseryName || ""}
        classes={classes}
        onClose={() => setShowAttendanceForm(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md  overflow-y-auto">
        <h3 className="text-xl font-bold text-gray-700 mb-6 text-center">帳票出力</h3>

        <div className="space-y-4">
          <button
            onClick={handleHealthCheck}
            className="w-full py-4 px-6 rounded-xl text-gray-700 font-bold bg-white border-2 border-gray-100 hover:border-violet-200 hover:bg-violet-50 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FaHeartbeat className="text-violet-500" />
            健康チェック表
          </button>

          <button
            onClick={handleAttendanceReport}
            className="w-full py-4 px-6 rounded-xl text-gray-700 font-bold bg-white border-2 border-gray-100 hover:border-violet-200 hover:bg-violet-50 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FaUsers className="text-violet-500" />
            出席簿
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 px-6 rounded-xl text-gray-500 font-bold hover:bg-gray-100 transition-colors duration-200"
        >
          キャンセル
        </button>
      </div>
    </div>
  );
}
