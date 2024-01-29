import { IAction } from "../../utils/types";
import {
  POST_ORDER_SUCCESS,
  ORDER_LOADING,
  ORDER_ERROR,
  DELETE_ORDER,
} from "./actions";

export const initialState = {
  orderNumber: null,
  loading: false,
  error: null,
};

export const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case ORDER_LOADING: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case ORDER_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case POST_ORDER_SUCCESS:
      return {
        ...state,
        orderNumber: action.payload,
        loading: false,
      };
    case DELETE_ORDER: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};
