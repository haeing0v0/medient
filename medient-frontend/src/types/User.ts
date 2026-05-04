export interface SignupRequest {
  userId: string;
  password: string;
  userName: string;
  gender: string;
  age: number;
  isPregnant: boolean;
}

export interface LoginRequest {
  userId: string;
  password: string;
}

export interface LoginResponse {
  userNo: number;
  userId: string;
  userName: string;
  gender: string;
  age: number;
  isPregnant: boolean;
  message: string;
}
