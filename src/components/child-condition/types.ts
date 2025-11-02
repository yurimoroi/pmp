export interface Student {
  id: number;
  name: string;
  classId: number;
}

export interface PickupPerson {
  id: number;
  name: string;
  relation: string;
}

export type ArriveStep =
  | "class"
  | "name"
  | "pickup"
  | "condition"
  | "play"
  | "reason"
  | "confirm"
  | "complete";

export interface BaseConfirmProps {
  classId: number;
  studentId: number;
  onConfirm: () => void;
  onBack: () => void;
}

export interface CheckinConfirmProps extends BaseConfirmProps {
  pickupTime: string;
  pickupPersonId: number;
  temperature: number;
  condition: string;
  canOutdoorPlay: boolean;
  canWaterPlay: boolean;
  absenceReason?: string;
  absenceDetail?: string;
}

export interface CheckoutConfirmProps extends BaseConfirmProps {
  absenceReason?: string;
  absenceDetail?: string;
}

export type ConfirmScreenProps = CheckinConfirmProps | CheckoutConfirmProps;
