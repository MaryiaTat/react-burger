import { checkResponse } from "./utils";

const API = "https://norma.nomoreparties.space/api";

const request = (url, options) => fetch(url, options).then(checkResponse);

export const getIngredientsAPI = () =>
  request(`${API}/ingredients`);

export const refreshToken = () => {
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

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
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

export const postOrderApi = (content) => {
  return fetchWithRefresh(`${API}/orders`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
};

export const postForgotPasswordApi = (content) => {
  return request(`${API}/password-reset`, {
    method: "POST",
    headers: {
      Authorization: "Basic",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
};

export const postResetPasswordApi = (content) => {
  return request(`${API}/password-reset/reset`, {
    method: "POST",
    headers: {
      Authorization: "Basic",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
};

export const postRegisterApi = (content) => {
  return request(`${API}/auth/register`, {
    method: "POST",
    headers: {
      Authorization: "Basic",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
};

export const postLoginApi = (content) => {
  return request(`${API}/auth/login`, {
    method: "POST",
    headers: {
      Authorization: "Basic",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
};

export const postLogoutApi = () => {
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

export const getUserApi = () => {
  return fetchWithRefresh(`${API}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: localStorage.getItem("accessToken"),
    },
  });
};

export const getUpdateUserApi = (content) => {
  return fetchWithRefresh(`${API}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(content),
  });
};
