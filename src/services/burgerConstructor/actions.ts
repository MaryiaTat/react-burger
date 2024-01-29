import { IConstructorElementProps } from "../../components/burger-constructor-filling/burger-constructor-filling";

export const ADD_CONSTRUCTOR_INGREDIENT_FILLING =
  "ADD_CONSTRUCTOR_INGREDIENT_FILLING";
export const DELETE_CONSTRUCTOR_INGREDIENT_FILLING =
  "DELETE_CONSTRUCTOR_INGREDIENT_FILLING";
export const ADD_CONSTRUCTOR_INGREDIENT_BUN = "ADD_CONSTRUCTOR_INGREDIENT_BUN";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";
export const SORT_CONSTRUCTOR_INGREDIENT = "SORT_CONSTRUCTOR_INGREDIENT";

export const addConstructorIngredientFilling = (
  payload: IConstructorElementProps
) => {
  return {
    type: ADD_CONSTRUCTOR_INGREDIENT_FILLING,
    payload,
  };
};

export const deleteConstructorIngredientFilling = (payload: string) => {
  return {
    type: DELETE_CONSTRUCTOR_INGREDIENT_FILLING,
    payload,
  };
};

export const addConstructorIngredientBun = (payload: string) => {
  return {
    type: ADD_CONSTRUCTOR_INGREDIENT_BUN,
    payload,
  };
};

export const clearConstructor = () => {
  return {
    type: CLEAR_CONSTRUCTOR,
  };
};

export const sortConstructorIngredient = (payload: {
  dragIndex: number;
  hoverIndex: number;
}) => {
  return {
    type: SORT_CONSTRUCTOR_INGREDIENT,
    payload,
  };
};
