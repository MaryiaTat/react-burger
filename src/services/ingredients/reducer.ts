import { IAction, IIngredientProps } from "../../utils/types";
import {
  GET_INGREDIENTS_SUCCESS,
  INGREDIENTS_LOADING,
  INGREDIENTS_ERROR,
} from "./actions";

interface IIngredientsStore {
  ingredients: Array<IIngredientProps> | [];
  loading: boolean;
  error: string | null;
}

export const initialState: IIngredientsStore = {
  ingredients: [],
  loading: false,
  error: null,
};

export const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case INGREDIENTS_LOADING: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case INGREDIENTS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
