import { createReducer } from "@reduxjs/toolkit";
import { WebsocketStatus } from "../../utils/constants";
import { ILiveOrdersAll } from "../../utils/types";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./actions";

export type TLiveOrderStore = {
  status: WebsocketStatus;
  data: ILiveOrdersAll | null;
  connectingError: string;
};

export const initialState: TLiveOrderStore = {
  status: WebsocketStatus.OFFLINE,
  data: null,
  connectingError: "",
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.connectingError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.data = action.payload;
    });
});
