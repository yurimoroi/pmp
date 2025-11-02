export interface CareerEntry {
  enrollmentAt: string;
  resignationAt: string;
  occupation: string;
  companyName: string;
}

export interface StaffBasicInfo {
  workerId: number;
  name: string;
  ruby: string;
  birth: string;
  gender: string;
  phoneNumber: string;
  zipCode: string;
  address: string;
  affiliation: string;
  occupation: string;
  enrollmentAt: string;
  resignationAt: string;
  resignationReason: string;
  commutingAllowance: number;
  meansOfTransportation: string;
  oneWayDistance: number;
  dependentDeducationFlg: boolean;
  numberOfDependents: number;
  unemployeeInsuranceFlg: boolean;
  socialInsuranceFlg: boolean;
  remarks: string;
}

export interface StaffSalaryInfo {
  qualification: string;
  area: string;
  type: string;
  post: string;
  grade: number;
  workingDays: number;
  workingHour: number;
  regularSalary: {
    salary: number;
    basicSalary: number;
    qualificationAllowance: number;
    areaAllowance: number;
    postAllowance: number;
    adjustmentAllowance: number;
  };
  partTimeSalary: {
    hourlyWage: number;
    qualificationWage: number;
    enrollmentWage: number;
    areaWage: number;
    evaluationWage: number;
    adjustmentWage: number;
  };
  evaluation: {
    summerEvaluation: string;
    winterEvaluation: string;
  };
  diverseWorkOptions: {
    requestedDayoff: boolean;
    earlyShift: boolean;
    lateShift: boolean;
    saturdayDayoff: boolean;
    existingTransfar: boolean;
    newTransfar: boolean;
    summerVacation: boolean;
    newYearVacation: boolean;
    yearEndVacation: boolean;
    startFiscalYearVacation: boolean;
    endFiscalYearVacation: boolean;
  };
}

export interface EmployeeBasicSalary {
  type: string;
  grade: number;
  post: string;
  basic_salary: number;
}

export interface AreaAllowance {
  type: string;
  area: string;
  allowance: number;
}

export interface EnrollmentWage {
  period: number;
  wage: number;
}

export interface HourlyWage {
  area: {
    [key: string]: {
      basic_hourly_wage: number;
      minimum_hourly_wage: number;
    };
  };
}

export interface QualificationAllowance {
  type: {
    [key: string]: {
      qualification: string;
      allowance: number;
    }[];
  };
}

export interface PostAllowance {
  type: {
    [key: string]: {
      post: string;
      allowance: number;
    }[];
  };
}

export interface Career {
  id?: string;
  workerId?: number;
  enrollmentAt: Date;
  resignationAt: Date;
  occupation: string;
  companyName: string;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}

export interface Salary {
  id?: string;
  workerId?: number;
  salary: number;
  basicSalary: number;
  qualificationAllowance: number;
  areaAllowance: number;
  postAllowance: number;
  adjustmentAllowance: number;
  hourlyWage: number;
  qualificationWage: number;
  enrollmentWage: number;
  areaWage: number;
  evaluationWage: number;
  adjustmentWage: number;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}

export interface Evaluation {
  id?: string;
  workerId?: number;
  type: string;
  grade: number;
  area: string;
  post: string;
  qualification: string;
  workingDays: number;
  workingHour: number;
  rate?: number;
  requestedDayoff: boolean;
  earlyShift: boolean;
  lateShift: boolean;
  summerVacation: boolean;
  yearEndVacation: boolean;
  newYearVacation: boolean;
  endFiscalYearVacation: boolean;
  startFiscalYearVacation: boolean;
  saturdayDayoff: boolean;
  existingTransfar: boolean;
  newTransfar: boolean;
  summerEvaluation: number;
  winterEvaluation: number;
  evaluationFlg: boolean;
  evaluationRefrectFlg: boolean;
  smer: number;
  smerFlg: boolean;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}

export interface WelfareBenefits {
  id: string;
  workerId: number;
  occupation: string;
  enrollmentAt: Date | null;
  resignationAt: Date | null;
  resignationReason: string | null;
  commutingAllowance: number;
  meansOfTransportation: string | null;
  oneWayDistance: number;
  dependentDeducationFlg: boolean;
  numberOfDependents: number;
  unemployeeInsuranceFlg: boolean;
  socialInsuranceFlg: boolean;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}

export interface Personal {
  workerId?: number;
  name: string;
  ruby: string;
  gender: string | null;
  birth: Date | null;
  zipcode: string | null;
  address: string | null;
  phoneNumber: string | null;
  affiliation: string | null;
  remarks: string | null;
  createdBy?: string | null;
  createdAt?: Date;
  updatedBy?: string | null;
  updatedAt?: Date;
  deleteFlg?: boolean;
}

export interface StaffInfoResponse {
  personal: Personal;
  salary: Salary;
  careers: Career[];
  evaluation: Evaluation;
  welfareBenefits: WelfareBenefits;
}
