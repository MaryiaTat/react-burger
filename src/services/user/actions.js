import {
  getUserApi,
  postLoginApi,
  postRegisterApi,
  getUpdateUserApi,
  postLogoutApi,
} from "../../utils/burger-api";

export const SET_USER = "SET_USER";
export const SET_IS_AUTH_CHECKED = "SET_IS_AUTH_CHECKED";
export const USER_CHANGES_LOADING = "USER_REGISTRATION_LOADING";
export const USER_CHANGES_ERROR = "USER_REGISTRATION_ERROR";

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const setIsAuthChecked = (payload) => ({
  type: SET_IS_AUTH_CHECKED,
  payload,
});

export const getUser = () => {
  return (dispatch) => {
    return getUserApi().then((res) => dispatch(setUser(res?.user)));
  };
};

export const updateUserInfo = (userInfo) => (dispatch) => {
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

export const login = (userInfo) => (dispatch) => {
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

export const logOut = () => (dispatch) => {
  dispatch({ type: USER_CHANGES_LOADING });
  return postLogoutApi()
    .then((res) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
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

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
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

export const register = (userInfo) => (dispatch) => {
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
