import axiosInstance from "./axios";
import type { StatisticsResponse } from "../types/Statistics";

export const getStatistics = async () => {
  const res = await axiosInstance.get<StatisticsResponse>("/statistics");
  return res.data;
};
