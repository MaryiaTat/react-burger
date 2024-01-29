import { IIngredientProps } from "../../utils/types";
export const ADD_INGREDIENT = "ADD_INGREDIENT";

export const addIngredient = (payload: IIngredientProps) => {
  return {
    type: ADD_INGREDIENT,
    payload,
  };
};
