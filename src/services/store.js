import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer } from "./reducer";
import thunkMiddleware from "redux-thunk";
import { socketMiddleware } from "./middleware/socket-middleware";
import {
  connect,
  disconnect,
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
} from "./liveOrders/actions";

const liveOrderMiddleware = socketMiddleware({
  wsConnect: connect,
  wsDisconnect: disconnect,
  wsConnecting: wsConnecting,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
});

export const configureStore = (initialState) => {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware, liveOrderMiddleware))
  );

  return store;
};
