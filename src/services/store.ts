import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer } from "./reducer";
import thunkMiddleware from "redux-thunk";
import { socketMiddleware } from "./middleware/socket-middleware";
import {
  connect as liveOrderConnect,
  disconnect as liveOrderDisonnect,
  wsConnecting as liveOrderConnecting,
  wsOpen as liveOrderWsOpen,
  wsClose as liveOrderWsClose,
  wsError as liveOrderWsError,
  wsMessage as liveOrderWsMessage,
} from "./liveOrders/actions";
import {
  connect as liveOrderUserConnect,
  disconnect as liveOrderUserDisonnect,
  wsConnecting as liveOrderUserConnecting,
  wsOpen as liveOrderUserWsOpen,
  wsClose as liveOrderUserWsClose,
  wsError as liveOrderUserWsError,
  wsMessage as liveOrderUserWsMessage,
} from "./liveUserOrders/actions";
import { RootState } from "./reducer";

const liveOrderMiddleware = socketMiddleware({
  wsConnect: liveOrderConnect,
  wsDisconnect: liveOrderDisonnect,
  wsConnecting: liveOrderConnecting,
  onOpen: liveOrderWsOpen,
  onClose: liveOrderWsClose,
  onError: liveOrderWsError,
  onMessage: liveOrderWsMessage,
});

const liveOrderUserMiddleware = socketMiddleware(
  {
    wsConnect: liveOrderUserConnect,
    wsDisconnect: liveOrderUserDisonnect,
    wsConnecting: liveOrderUserConnecting,
    onOpen: liveOrderUserWsOpen,
    onClose: liveOrderUserWsClose,
    onError: liveOrderUserWsError,
    onMessage: liveOrderUserWsMessage,
  },
  true
);

export const configureStore = (initialState: RootState) => {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware,
        liveOrderMiddleware,
        liveOrderUserMiddleware
      )
    )
  );

  return store;
};
