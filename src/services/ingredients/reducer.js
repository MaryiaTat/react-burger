import {
  GET_INGREDIENTS_SUCCESS,
  INGREDIENTS_LOADING,
  INGREDIENTS_ERROR,
} from "./actions";

export const initialState = {
  ingredients: [],
  loading: false,
  error: null,
};

export const reducer = (state = initialState, action) => {
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
