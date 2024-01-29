import { IAction } from "../../utils/types";
import { ADD_INGREDIENT } from "./actions";

export const initialState = {
  ingredient: null,
};

export const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredient: action.payload,
      };
    }
    default:
      return state;
  }
};
