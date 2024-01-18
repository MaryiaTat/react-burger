import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer } from "./reducer";
import thunkMiddleware from "redux-thunk";

export const configureStore = (initialState) => {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );

  return store;
};
