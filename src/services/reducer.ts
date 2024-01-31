import { combineReducers } from "redux";
import { reducer as ingredientsReducer } from "./ingredients/reducer";
import { reducer as ingredientDetailsReducer } from "./ingredientDetails/reducer";
import { reducer as constructorIngredientsReducer } from "./burgerConstructor/reducer";
import { reducer as orderReducer } from "./order/reducer";
import { reducer as userReducer } from "./user/reducer";
import { reducer as LiveOrderReducer } from "./liveOrders/reducer";
import { reducer as LiveUserOrderReducer } from "./liveUserOrders/reducer";

export const reducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  constructorIngredients: constructorIngredientsReducer,
  order: orderReducer,
  user: userReducer,
  liveOrders: LiveOrderReducer,
  liveUserOrders: LiveUserOrderReducer,
});

export type RootState = ReturnType<typeof reducer>;
