import holidays from "@holiday-jp/holiday_jp";

interface NurseryClass {
  class: string;
  display_flg: boolean;
}

// 園名からクラス名を取得する
export const getNurseryClassName = async (nurseryName: string) => {
  const filePath = `/json/nursery-system/n_class.json`;
  const response = await fetch(filePath);
  const data = await response.json();

  const classNames = data[nurseryName].filter((classInfo: NurseryClass) => classInfo.display_flg).map((classinfo: NurseryClass) => classinfo.class);

  return classNames;
};

// 日本時間の00:00:00を取得
export const getAttendanceAt = () => {
  const today = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const date = `${year}-${month}-${day}`;
  const attendanceAt = new Date(date);
  return attendanceAt;
};

// 園名から設定を取得する
export const getNurserySettings = async (nurseryName: string) => {
  const filePath = `/json/nursery-system/n_settings.json`;
  const response = await fetch(filePath);
  const data = await response.json();
  return data[nurseryName];
};

// 指定された日付が祝日かどうかを判定する
export const isHoliday = (date: Date): boolean => {
  return holidays.isHoliday(date);
};

// お迎え時間を取得する
export const getPickupTime = () => {
  const times = Array.from({ length: 53 }, (_, i) => {
    const hour = Math.floor(i / 4) + 9; // 9時から
    const minute = (i % 4) * 15; // 15分刻み
    return `${hour}:${minute.toString().padStart(2, "0")}`;
  });
  return times;
};

// 園名から次のクラス名を取得する
export const getNurseryNextClassName = async (nurseryName: string, className: string) => {
  const filePath = `/json/nursery-system/n_class_flow.json`;
  const response = await fetch(filePath);
  const data = await response.json();

  let nextClassName: string[] = [];

  if (className === "") {
    nextClassName = data[nurseryName][data[nurseryName].length - 1];
  } else {
    const index = data[nurseryName].findIndex((classinfo: string) => classinfo.includes(className));

    nextClassName = index === data[nurseryName].length - 1 ? data[nurseryName][data[nurseryName].length - 1] : data[nurseryName][index + 1];
  }

  return nextClassName;
};
