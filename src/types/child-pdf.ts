export interface HealthCheckData {
  attendanceAt: Date | null;
  attendanceTime: Date | null;
  bodyTemperature: number | null;
  name: string;
  childId: number;
  pickupPerson: string | null;
  pickupPlanTime: string | null;
  playingOutside: boolean | null;
  playingWater: boolean | null;
  takeMedicineFlg: boolean | null;
}

export interface AttendanceData {
  absenceReason: string | null;
  attendanceAt: Date | null;
  name: string;
  childId: number;
  stopAttendanceFlg: boolean | null;
}
