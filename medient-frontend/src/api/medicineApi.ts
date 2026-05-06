import axiosInstance from "./axios";
import type { Medicine, MedicineRequest } from "../types/Medicine";

const USER_ID = 1;

export const getMedicines = async () => {
  const res = await axiosInstance.get<Medicine[]>("/medicines", {
    params: { userId: USER_ID },
  });

  return res.data;
};

export const getTodayMedicines = async () => {
  const res = await axiosInstance.get<Medicine[]>("/medicines/today", {
    params: { userId: USER_ID },
  });

  return res.data;
};

export const getMedicine = async (id: number) => {
  const res = await axiosInstance.get<Medicine>(`/medicines/${id}`, {
    params: { userId: USER_ID },
  });

  return res.data;
};

export const addMedicine = async (data: Omit<MedicineRequest, "userId">) => {
  const res = await axiosInstance.post("/medicines", {
    ...data,
    userId: USER_ID,
  });

  return res.data;
};

export const updateMedicine = async (
  id: number,
  data: Omit<MedicineRequest, "userId">,
) => {
  const res = await axiosInstance.put(`/medicines/${id}`, {
    ...data,
    userId: USER_ID,
  });

  return res.data;
};

export const completeMedicine = async (id: number) => {
  const res = await axiosInstance.put(`/medicines/${id}/taken`, null, {
    params: { userId: USER_ID },
  });

  return res.data;
};

export const deleteMedicine = async (id: number) => {
  const res = await axiosInstance.delete(`/medicines/${id}`, {
    params: { userId: USER_ID },
  });

  return res.data;
};
