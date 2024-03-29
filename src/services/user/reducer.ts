import { IAction, IUserInfo } from "../../utils/types";
import {
  SET_USER,
  SET_IS_AUTH_CHECKED,
  USER_CHANGES_LOADING,
  USER_CHANGES_ERROR,
} from "./actions";

interface IUserStore {
  user: IUserInfo | null;
  loading: boolean;
  error: string | null;
  isAuthChecked: boolean;
}

export const initialState: IUserStore = {
  user: null,
  loading: false,
  error: null,
  isAuthChecked: false,
};

export const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case SET_IS_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    case USER_CHANGES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_CHANGES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
