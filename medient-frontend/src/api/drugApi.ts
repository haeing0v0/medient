import axiosInstance from "./axios";
import type { DrugSearchResponse, DrugDetailResponse } from "../types/Drug";

export const searchDrugs = async (keyword: string) => {
  const res = await axiosInstance.get<DrugSearchResponse[]>("/drugs/search", {
    params: { keyword },
  });

  return res.data;
};

export const getDrugDetail = async (itemSeq: string) => {
  const res = await axiosInstance.get<DrugDetailResponse>(`/drugs/${itemSeq}`);
  return res.data;
};
