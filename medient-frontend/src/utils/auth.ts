export interface LoginUser {
  userNo: number;
  userId: string;
  userName: string;
  age: number;
  gender: string;
  isPregnant: boolean;
  token: string;
}

interface JwtPayload {
  exp?: number;
  userNo?: number;
  userId?: string;
}

export const getLoginUser = (): LoginUser | null => {
  const savedUser = localStorage.getItem("loginUser");

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser);
  } catch {
    localStorage.removeItem("loginUser");
    return null;
  }
};

export const isTokenExpired = (token: string) => {
  try {
    const payloadBase64 = token.split(".")[1];

    if (!payloadBase64) {
      return true;
    }

    const payloadJson = atob(payloadBase64);
    const payload: JwtPayload = JSON.parse(payloadJson);

    if (!payload.exp) {
      return true;
    }

    const now = Math.floor(Date.now() / 1000);

    return payload.exp < now;
  } catch {
    return true;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("loginUser");
};
