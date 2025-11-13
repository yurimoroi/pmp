import { useState } from "react";
import { format } from "date-fns";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import { HealthCheckSheet } from "@/pdf/nursery-system/HealthCheckSheet";
import { HealthCheckData } from "@/types/child-pdf";
import { Button } from "../common/Button";

interface HealthCheckFormModalProps {
  nurseryName: string;
  classes: string[];
  onClose: () => void;
}

export function HealthCheckFormModal({ nurseryName, classes, onClose }: HealthCheckFormModalProps) {
  const [selectedClass, setSelectedClass] = useState("");
  const [dateFrom, setDateFrom] = useState(format(new Date(), "yyyy-MM-dd"));
  const [dateTo, setDateTo] = useState(format(new Date(), "yyyy-MM-dd"));
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [listData, setListData] = useState<HealthCheckData[][]>([]);

  const fetchChildren = async () => {
    const response = await fetch("https://4duvwc9h43.execute-api.ap-northeast-1.amazonaws.com/dev/nursery/pdf/health-checks-get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nurseryName,
        className: selectedClass,
        from: dateFrom,
        to: dateTo,
      }),
    });

    const body = await response.json();

    if (response.status !== 200) {
      if (response.status === 404) {
        alert(body.message);
        return false;
      }
      throw new Error(body.message);
    }
    const rowData = body as HealthCheckData[];

    // attendanceAtでグループ化
    const groupedData = rowData.reduce((acc: { [key: string]: HealthCheckData[] }, curr: HealthCheckData) => {
      const dateKey = curr.attendanceAt ? new Date(curr.attendanceAt).toISOString().split("T")[0] : "null";
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(curr);
      return acc;
    }, {});

    // 日付でソートして2次元配列に変換
    const sortedData = Object.entries(groupedData)
      .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
      .map(([, data]) => data) as HealthCheckData[][];

    setListData(sortedData);

    return true;
  };

  const handlePreview = async () => {
    if (!selectedClass) {
      alert("クラスを選択してください。");
      return;
    }

    try {
      const isSuccess = await fetchChildren();
      if (!isSuccess) return;

      setShowPreview(true);
    } catch (error) {
      console.error("プレビュー表示中にエラーが発生しました:", error);
      alert("プレビュー表示中にエラーが発生しました。もう一度お試しください。");
    }
  };

  const handleDownload = async () => {
    try {
      setIsGenerating(true);

      const doc = await pdf(<HealthCheckSheet className={selectedClass} listData={listData} />).toBlob();

      // ファイル名を生成
      const fileName = `健康チェック表_（${format(new Date(dateFrom), "yyyy.MM.dd")}-${format(new Date(dateTo), "yyyy.MM.dd")}_${selectedClass}ぐみ）.pdf`;

      // Blobからダウンロードリンクを作成
      const url = URL.createObjectURL(doc);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;

      // ダウンロードを実行
      document.body.appendChild(link);
      link.click();

      // クリーンアップ
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
              <HealthCheckSheet className={selectedClass} listData={listData} />
            </PDFViewer>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-gray-700 mb-6 text-center">健康チェック表出力</h3>

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
            <label className="block text-sm text-gray-500 mb-2">期間（開始日）</label>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full p-2 rounded-xl border-2 border-gray-100 focus:border-violet-400 focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">期間（終了日）</label>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full p-2 rounded-xl border-2 border-gray-100 focus:border-violet-400 focus:outline-none" />
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
