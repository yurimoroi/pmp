import { useState } from "react";
import { format, getDaysInMonth, isSunday } from "date-fns";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import { AttendanceSheet, AttendanceStatus, ListData } from "@/pdf/nursery-system/AttendanceSheet";
import { AttendanceData } from "@/types/child-pdf";
import { isHoliday } from "@/utility/nursery";
import { Button } from "../common/Button";
import { signOut } from "aws-amplify/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface AttendanceFormModalProps {
  nurseryName: string;
  classes: string[];
  onClose: () => void;
  router: AppRouterInstance;
  token: string | undefined;
}

export function AttendanceFormModal({ nurseryName, classes, onClose, router, token }: AttendanceFormModalProps) {
  const [selectedClass, setSelectedClass] = useState("");
  const [yearMonth, setYearMonth] = useState(format(new Date(), "yyyy-MM"));
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [listData, setListData] = useState<ListData[]>([]);
  const [dataCount, setDataCount] = useState<number[]>([]);

  const processAttendanceData = (data: AttendanceData[]) => {
    const daysInMonth = getDaysInMonth(new Date(yearMonth));
    const [year, month] = yearMonth.split("-");

    // 初期値を設定（日曜・祝日は空文字、それ以外は「未」）
    const attendanceData = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(Number(year), Number(month) - 1, i + 1);
      return (isSunday(date) || isHoliday(date) ? "" : "未") as AttendanceStatus;
    });

    const dataCount: number[] = Array(daysInMonth).fill(0);
    let attendanceData2 = [...attendanceData];

    let childId = data[0].childId;
    let childName = data[0].name;

    const listData: ListData[] = [];

    data.forEach((child) => {
      if (childId !== child.childId) {
        const listData2: ListData = {
          name: childName,
          attendance: attendanceData2,
          attendanceDateCount: attendanceData2.filter((attendance) => attendance === "〇").length,
          diseaseCount: attendanceData2.filter((attendance) => attendance.includes("病")).length,
          circumstanceCount: attendanceData2.filter((attendance) => attendance.includes("事")).length,
          otherCount: attendanceData2.filter((attendance) => attendance.includes("通") || attendance.includes("災")).length,
          stopCount: attendanceData2.filter((attendance) => attendance.includes("停")).length,
        };
        listData.push(listData2);
        attendanceData2 = [...attendanceData];
        childId = child.childId;
        childName = child.name;
      }

      if (child.attendanceAt) {
        const str: AttendanceStatus = child.absenceReason
          ? child.absenceReason === "都合欠席"
            ? child.stopAttendanceFlg
              ? "事停"
              : "事"
            : child.absenceReason === "通院"
            ? child.stopAttendanceFlg
              ? "通停"
              : "通"
            : child.absenceReason === "災害欠席"
            ? child.stopAttendanceFlg
              ? "災停"
              : "災"
            : child.stopAttendanceFlg
            ? "病停"
            : "病"
          : child.absenceReason === "その他"
          ? child.stopAttendanceFlg
            ? "他停"
            : "他"
          : "〇";

        const date = new Date(child.attendanceAt);
        attendanceData2[date.getDate() - 1] = str;
      }
    });

    const listData2: ListData = {
      name: childName,
      attendance: attendanceData2,
      attendanceDateCount: attendanceData2.filter((attendance) => attendance === "〇").length,
      diseaseCount: attendanceData2.filter((attendance) => attendance.includes("病")).length,
      circumstanceCount: attendanceData2.filter((attendance) => attendance.includes("事")).length,
      otherCount: attendanceData2.filter((attendance) => attendance.includes("通") || attendance.includes("他")).length,
      stopCount: attendanceData2.filter((attendance) => attendance.includes("停")).length,
    };
    listData.push(listData2);

    listData.forEach((data) => {
      data.attendance.forEach((attendance, index) => {
        if (attendance === "〇") {
          dataCount[index]++;
        }
      });
    });

    setListData(listData);
    setDataCount(dataCount);
  };

  const fetchChildren = async () => {
    try {
      const from = new Date(`${yearMonth}-01`);
      const to = new Date(`${yearMonth}-${getDaysInMonth(from)}`);

      const response = await fetch("https://4duvwc9h43.execute-api.ap-northeast-1.amazonaws.com/dev/nursery/pdf/attendances-get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nurseryName,
          className: selectedClass,
          from: format(from, "yyyy-MM-dd"),
          to: format(to, "yyyy-MM-dd"),
        }),
      });

      const responseData = await response.json();

      if (response.status !== 200) {
        if (response.status === 401) {
          alert("セッションが切れました。再度ログインしてください。");
          signOut();
          router.push("/login");
          return;
        }

        throw new Error(responseData.message);
      }
      processAttendanceData(responseData);
    } catch (error) {
      console.error("園児データ取得エラー:", error);
      alert("園児データの取得に失敗しました。もう一度お試しください。");
    }
  };

  const handlePreview = async () => {
    if (!selectedClass) {
      alert("クラスを選択してください。");
      return;
    }

    try {
      await fetchChildren();
      setShowPreview(true);
    } catch (error) {
      console.error("プレビュー表示中にエラーが発生しました:", error);
      alert("プレビュー表示中にエラーが発生しました。もう一度お試しください。");
    }
  };

  const handleDownload = async () => {
    try {
      setIsGenerating(true);

      await fetchChildren();

      const doc = await pdf(<AttendanceSheet className={selectedClass} yearMonth={yearMonth} listData={listData} dataCount={dataCount} />).toBlob();

      const [year, month] = yearMonth.split("-");
      const fileName = `出席簿_（${year}.${month}_${selectedClass}ぐみ）.pdf`;

      const url = URL.createObjectURL(doc);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      onClose();
    } catch (error) {
      console.error("PDF生成中にエラーが発生しました:", error);
      alert("PDF生成中にエラーが発生しました。もう一度お試しください。");
    } finally {
      setIsGenerating(false);
    }
  };

  if (showPreview) {
    return (
      <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-[95vw] h-[95vh] flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-700">プレビュー</h3>
            <div className="flex gap-2">
              <Button onClick={() => setShowPreview(false)} variant="outline-secondary" size="sm" className="font-bold">
                戻る
              </Button>
              <Button onClick={handleDownload} variant="secondary" size="sm" className="font-bold" disabled={isGenerating}>
                {isGenerating ? "生成中..." : "ダウンロード"}
              </Button>
            </div>
          </div>
          <div className="flex-1 w-full bg-gray-100 rounded-xl overflow-hidden">
            <PDFViewer width="100%" height="100%" style={{ border: "none" }}>
              <AttendanceSheet className={selectedClass} yearMonth={yearMonth} listData={listData} dataCount={dataCount} />
            </PDFViewer>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-gray-700 mb-6 text-center">出席簿出力</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-2">クラス</label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full p-2 rounded-xl border-2 border-gray-100 focus:border-violet-400 focus:outline-none">
              <option value="">選択してください</option>
              {classes.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">年月</label>
            <input
              type="month"
              value={yearMonth}
              onChange={(e) => setYearMonth(e.target.value)}
              className="w-full p-2 rounded-xl border-2 border-gray-100 focus:border-violet-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button type="button" onClick={onClose} variant="outline-secondary" size="md" className="flex-1" disabled={isGenerating}>
            キャンセル
          </Button>
          <Button type="button" onClick={handlePreview} variant="secondary" size="md" className="flex-1" disabled={isGenerating}>
            プレビュー
          </Button>
        </div>
      </div>
    </div>
  );
}
