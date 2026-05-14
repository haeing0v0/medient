import axiosInstance from "./axios";
import type { Medicine, MedicineRequest } from "../types/Medicine";
import type { DurWarningCache } from "../types/Medicine";

export const getMedicines = async () => {
  const res = await axiosInstance.get<Medicine[]>("/medicines");

  return res.data;
};

export const getTodayMedicines = async () => {
  const res = await axiosInstance.get<Medicine[]>("/medicines/today");

  return res.data;
};

export const getMedicine = async (id: number) => {
  const res = await axiosInstance.get<Medicine>(`/medicines/${id}`);

  return res.data;
};

export const addMedicine = async (data: Omit<MedicineRequest, "userId">) => {
  const res = await axiosInstance.post("/medicines", data);

  return res.data;
};

export const updateMedicine = async (
  id: number,
  data: Omit<MedicineRequest, "userId">,
) => {
  const res = await axiosInstance.put(`/medicines/${id}`, data);

  return res.data;
};

export const completeMedicine = async (id: number) => {
  const res = await axiosInstance.put(`/medicines/${id}/taken`);

  return res.data;
};

export const deleteMedicine = async (id: number) => {
  const res = await axiosInstance.delete(`/medicines/${id}`);

  return res.data;
};

export const getDurWarnings = async () => {
  const res = await axiosInstance.get<DurWarningCache[]>(
    "/medicines/dur-warnings",
  );

  return res.data;
};
