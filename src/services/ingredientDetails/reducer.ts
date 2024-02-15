import { IAction, IIngredientProps } from "../../utils/types";
import { ADD_INGREDIENT } from "./actions";

interface IIngredientStore {
  ingredient: IIngredientProps | null;
}

export const initialState: IIngredientStore = {
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
