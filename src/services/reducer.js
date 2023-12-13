import { combineReducers } from "redux";
import { reducer as ingredientsReducer } from "./ingredients/reducer";
import { reducer as ingredientDetailsReducer } from "./ingredientDetails/reducer";
import { reducer as constructorIngredientsReducer } from "./burgerConstructor/reducer";
import { reducer as orderReducer } from "./order/reducer";

export const reducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  constructorIngredients: constructorIngredientsReducer,
  order: orderReducer,
});
