import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "./services/store";

import { initialState as ingredientsInitialState } from "./services/ingredients/reducer";
import { initialState as ingredientDetailsInitialState } from "./services/ingredientDetails/reducer";
import { initialState as burgerConstructorInitialState } from "./services/burgerConstructor/reducer";
import { initialState as orderInitialState } from "./services/order/reducer";
import { initialState as userInitialState } from "./services/user/reducer";
import { initialState as liveOrdersInitialState } from "./services/liveOrders/reducer";
import { initialState as liveUserOrdersInitialState } from "./services/liveUserOrders/reducer";

const store = configureStore({
  ingredients: ingredientsInitialState,
  ingredientDetails: ingredientDetailsInitialState,
  constructorIngredients: burgerConstructorInitialState,
  order: orderInitialState,
  user: userInitialState,
  liveOrders: liveOrdersInitialState,
  liveUserOrders: liveUserOrdersInitialState,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
