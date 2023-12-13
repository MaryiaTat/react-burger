import { ADD_INGREDIENT, DELETE_INGREDIENT } from "./actions";

export const initialState = {
  ingredient: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredient: action.payload,
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        ingredient: null,
      };
    }
    default:
      return state;
  }
};
