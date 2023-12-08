export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";

export const addIngredient = (payload) => {
  return {
    type: ADD_INGREDIENT,
    payload,
  };
};

export const deleteIngredient = () => {
  return {
    type: DELETE_INGREDIENT,
  };
};
