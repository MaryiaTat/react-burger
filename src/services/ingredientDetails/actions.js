export const ADD_INGREDIENT = "ADD_INGREDIENT";

export const addIngredient = (payload) => {
  return {
    type: ADD_INGREDIENT,
    payload,
  };
};
