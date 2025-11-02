export interface HealthCheckData {
  attendanceAt: Date | null;
  attendanceTime: Date | null;
  bodyTemperature: number | null;
  children: {
    name: string;
  };
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
  children: {
    name: string;
  };
  childId: number;
  stopAttendanceFlg: boolean | null;
}
