export interface Medicine {
  id: number;
  userId: number;
  itemSeq: string;
  itemName: string;
  startDate: string;
  endDate: string;
  dailyCount: number;
  doseTime: string;
  status: string;
  memo: string;
  createdAt: string;
}

export interface MedicineRequest {
  userId: number;
  itemSeq?: string;
  itemName: string;
  startDate: string;
  endDate: string;
  dailyCount: number;
  doseTime: string;
  status: string;
  memo: string;
}

export interface DurWarningCache {
  id: number;
  userId: number;
  drug1Name: string;
  drug2Name: string;
  warningType: string;
  message: string;
  danger: boolean;
  createdAt: string;
  updatedAt: string;
}
