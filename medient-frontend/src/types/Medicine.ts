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
