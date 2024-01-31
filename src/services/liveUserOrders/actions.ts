import { createAction } from "@reduxjs/toolkit";
import { ILiveOrdersAll } from "../../utils/types";

export const connect = createAction<string, "LIVE_USER_ORDER_CONNECT">(
  "LIVE_USER_ORDER_CONNECT"
);
export const disconnect = createAction("LIVE_USER_ORDER_DISCONNECT");
export const wsConnecting = createAction("LIVE_USER_ORDER_WS_CONNECTING");

export const wsOpen = createAction("LIVE_USER_ORDER_WS_OPEN");
export const wsClose = createAction("LIVE_USER_ORDER_WS_CLOSE");
export const wsError = createAction<string, "LIVE_USER_ORDER_WS_ERROR">(
  "LIVE_USER_ORDER_WS_ERROR"
);
export const wsMessage = createAction<
  ILiveOrdersAll,
  "LIVE_USER_ORDER_WS_MESSAGE"
>("LIVE_USER_ORDER_WS_MESSAGE");

export type TliveUserOrderActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsError>
  | ReturnType<typeof wsMessage>;
