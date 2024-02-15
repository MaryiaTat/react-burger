import { IAction } from "../../utils/types";
import {
  POST_ORDER_SUCCESS,
  ORDER_LOADING,
  ORDER_ERROR,
  DELETE_ORDER,
  ORDER_SUCCESS,
} from "./actions";

interface IOrderStore {
  orderNumber: number | null;
  loading: boolean;
  error: string | null;
  currentOrder: number | null;
}

export const initialState: IOrderStore = {
  orderNumber: null,
  loading: false,
  error: null,
  currentOrder: null,
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
    case ORDER_SUCCESS:
      return {
        ...state,
        currentOrder: action.payload,
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
