import axios from "./axios";

export interface DurCheckRequest {
  drug1: string;
  drug2: string;
}

export interface DurWarning {
  type: string;
  message: string;
  danger: boolean;
}

export interface DurCheckResponse {
  hasDanger: boolean;
  warnings: DurWarning[];
}

export const checkDur = async (
  data: DurCheckRequest,
): Promise<DurCheckResponse> => {
  const response = await axios.post("/dur/check", data);

  return response.data;
};
