import axiosInstance from "./axios";
import type { LoginRequest, LoginResponse, SignupRequest } from "../types/User";

export const signup = async (data: SignupRequest) => {
  const res = await axiosInstance.post<string>("/users/signup", data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await axiosInstance.post<LoginResponse>("/users/login", data);
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post<string>("/users/logout");
  return res.data;
};
