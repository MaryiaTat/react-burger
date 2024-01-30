import { checkResponse } from "./utils";
import {
  IUserAllInfo,
  ILoginUserInfo,
  ILogin,
  IAllOrderInfo,
  IUpdate,
  IForgotPassword,
  IIngredients,
} from "./types";

const API = "https://norma.nomoreparties.space/api";
export const LIVE_ORDER_SERVER_URL_ALL =
  "wss://norma.nomoreparties.space/orders/all";

const request = <T>(url: string, options?: Record<string, any>): Promise<T> =>
  fetch(url, options).then(checkResponse<T>);

export const getIngredientsAPI = (): Promise<IIngredients> =>
  request(`${API}/ingredients`);

export const refreshToken = (): Promise<ILogin> => {
  return request(`${API}/auth/token`, {
    method: "POST",
    headers: {
      Authorization: "Basic",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const fetchWithRefresh = async <T>(
  url: string,
  options: Record<string, any>
): Promise<T> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err instanceof Error && err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const postOrderApi = (content: {
  ingredients: Array<string>;
}): Promise<IAllOrderInfo> => {
  return fetchWithRefresh(`${API}/orders`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
};

export const postForgotPasswordApi = (content: {
  email: string;
}): Promise<IForgotPassword> => {
  return request(`${API}/password-reset`, {
    method: "POST",
    headers: {
      Authorization: "Basic",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
};

export const postResetPasswordApi = (content: {
  password: string;
  token: string;
}): Promise<IForgotPassword> => {
  return request(`${API}/password-reset/reset`, {
    method: "POST",
    headers: {
      Authorization: "Basic",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
};

export const postRegisterApi = (content: IUserAllInfo): Promise<ILogin> => {
  return request(`${API}/auth/register`, {
    method: "POST",
    headers: {
      Authorization: "Basic",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
};

export const postLoginApi = (content: ILoginUserInfo): Promise<ILogin> => {
  return request(`${API}/auth/login`, {
    method: "POST",
    headers: {
      Authorization: "Basic",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
};

export const postLogoutApi = (): Promise<IForgotPassword> => {
  return request(`${API}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: "Basic",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const getUserApi = (): Promise<IUpdate> => {
  return fetchWithRefresh(`${API}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: localStorage.getItem("accessToken"),
    },
  });
};

export const getUpdateUserApi = (content: IUserAllInfo): Promise<IUpdate> => {
  return fetchWithRefresh(`${API}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(content),
  });
};
