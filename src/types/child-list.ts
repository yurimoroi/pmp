export interface Children {
  absenceReason: string | null;
  absenceReasonDetail: string | null;
  attendanceAt: Date | null;
  attendanceTime: Date | null;
  bodyTemperature: number | null;
  name: string;
  childId: number;
  conditions: string | null;
  pickupPerson: string | null;
  pickupPlanTime: string | null;
  pickupTime: Date | null;
  playingOutside: boolean | null;
  playingWater: boolean | null;
  stopAttendanceFlg: boolean | null;
  takeMedicineFlg: boolean | null;
}
