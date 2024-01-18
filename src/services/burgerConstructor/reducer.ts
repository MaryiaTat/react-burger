import {
  ADD_CONSTRUCTOR_INGREDIENT_FILLING,
  DELETE_CONSTRUCTOR_INGREDIENT_FILLING,
  ADD_CONSTRUCTOR_INGREDIENT_BUN,
  CLEAR_CONSTRUCTOR,
  SORT_CONSTRUCTOR_INGREDIENT,
} from "./actions";
import { ConstructorFillingTypes, IAction } from "../../utils/types";

interface InitialStateType {
  bun: null | string;
  constructorFilling: ConstructorFillingTypes[];
}

export const initialState: InitialStateType = {
  bun: null,
  constructorFilling: [],
};

export const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case ADD_CONSTRUCTOR_INGREDIENT_FILLING: {
      return {
        ...state,
        constructorFilling: [...state.constructorFilling, action.payload],
      };
    }
    case DELETE_CONSTRUCTOR_INGREDIENT_FILLING: {
      return {
        ...state,
        constructorFilling: state.constructorFilling.filter(
          (item) => item.id !== action.payload
        ),
      };
    }
    case ADD_CONSTRUCTOR_INGREDIENT_BUN: {
      return {
        ...state,
        bun: action.payload,
      };
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...initialState,
      };
    }
    case SORT_CONSTRUCTOR_INGREDIENT: {
      const newCards = [...state.constructorFilling];
      newCards.splice(action.payload.dragIndex, 1);
      newCards.splice(
        action.payload.hoverIndex,
        0,
        state.constructorFilling[action.payload.dragIndex]
      );
      return {
        ...state,
        constructorFilling: [...newCards],
      };
    }
    default:
      return state;
  }
};
