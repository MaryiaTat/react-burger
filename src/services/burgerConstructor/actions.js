export const ADD_CONSTRUCTOR_INGREDIENT_FILLING =
  "ADD_CONSTRUCTOR_INGREDIENT_FILLING";
export const DELETE_CONSTRUCTOR_INGREDIENT_FILLING =
  "DELETE_CONSTRUCTOR_INGREDIENT_FILLING";
export const ADD_CONSTRUCTOR_INGREDIENT_BUN = "ADD_CONSTRUCTOR_INGREDIENT_BUN";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";
export const SORT_CONSTRUCTOR_INGREDIENT = "SORT_CONSTRUCTOR_INGREDIENT";

export const addConstructorIngredientFilling = (payload) => {
  return {
    type: ADD_CONSTRUCTOR_INGREDIENT_FILLING,
    payload,
  };
};

export const deleteConstructorIngredientFilling = (payload) => {
  return {
    type: DELETE_CONSTRUCTOR_INGREDIENT_FILLING,
    payload,
  };
};

export const addConstructorIngredientBun = (payload) => {
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

export const sortConstructorIngredient = (payload) => {
  return {
    type: SORT_CONSTRUCTOR_INGREDIENT,
    payload,
  };
};
