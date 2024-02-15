import { IUserInfo, IUserAllInfo, ILoginUserInfo } from "../../utils/types";
import {
  getUserApi,
  postLoginApi,
  postRegisterApi,
  getUpdateUserApi,
  postLogoutApi,
} from "../../utils/burger-api";
import { AppDispatch } from "../..";

export const SET_USER = "SET_USER";
export const SET_IS_AUTH_CHECKED = "SET_IS_AUTH_CHECKED";
export const USER_CHANGES_LOADING = "USER_REGISTRATION_LOADING";
export const USER_CHANGES_ERROR = "USER_REGISTRATION_ERROR";

export const setUser = (payload: IUserInfo | null) => ({
  type: SET_USER,
  payload,
});

export const setIsAuthChecked = (payload: boolean) => ({
  type: SET_IS_AUTH_CHECKED,
  payload,
});

export const getUser = () => {
  return (dispatch: AppDispatch) => {
    return getUserApi().then((res) => dispatch(setUser(res?.user)));
  };
};

export const updateUserInfo =
  (userInfo: IUserAllInfo) => (dispatch: AppDispatch) => {
    dispatch({ type: USER_CHANGES_LOADING });
    return getUpdateUserApi(userInfo)
      .then((res) => {
        dispatch(setUser(res.user));
        dispatch(setIsAuthChecked(true));
      })
      .catch((error) => {
        dispatch({
          type: USER_CHANGES_ERROR,
          payload: error.message,
        });
      });
  };

export const login = (userInfo: ILoginUserInfo) => (dispatch: AppDispatch) => {
  dispatch({ type: USER_CHANGES_LOADING });
  return postLoginApi(userInfo)
    .then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setIsAuthChecked(true));
    })
    .catch((error) => {
      dispatch({
        type: USER_CHANGES_ERROR,
        payload: error.message,
      });
    });
};

export const logOut = () => (dispatch: AppDispatch) => {
  dispatch({ type: USER_CHANGES_LOADING });
  return postLogoutApi()
    .then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
      dispatch(setIsAuthChecked(true));
    })
    .catch((error) => {
      dispatch({
        type: USER_CHANGES_ERROR,
        payload: error.message,
      });
    });
};

export const checkUserAuth = () => {
  return (dispatch: AppDispatch) => {
    if (localStorage.getItem("accessToken")) {
      getUser()(dispatch)
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  };
};

export const register = (userInfo: IUserAllInfo) => (dispatch: AppDispatch) => {
  dispatch({ type: USER_CHANGES_LOADING });
  return postRegisterApi(userInfo)
    .then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setIsAuthChecked(true));
    })
    .catch((error) => {
      dispatch({
        type: USER_CHANGES_ERROR,
        payload: error.message,
      });
    });
};
