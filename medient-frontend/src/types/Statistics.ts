export interface RateItem {
  label: string;
  rate: number;
}

export interface DangerItem {
  drug1: string;
  drug2: string;
  type: string;
  message: string;
}

export interface CalendarItem {
  date: string;
  taken: boolean;
}

export interface TodayMedicineItem {
  medicineId: number;
  time: string;
  itemName: string;
  status: string;
}

export interface StatisticsResponse {
  weeklyRate: number;
  monthlyRate: number;
  streakDays: number;
  dangerCount: number;
  weeklyGraph: RateItem[];
  monthlyGraph: RateItem[];
  dangerItems: DangerItem[];
  calendarItems: CalendarItem[];
  todayMedicines: TodayMedicineItem[];
  feedback: string;
}
