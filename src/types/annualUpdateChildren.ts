export interface AnnualUpdateChildren {
  childId: number;
  name: string;
  className: string;
  nextClassName: string;
  admissionAt: Date;
  leavingAt: Date | null;
}
