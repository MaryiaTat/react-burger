import { reducer, initialState } from "./reducer";
import { WebsocketStatus } from "../../utils/constants";

describe("Live orders reducer check", () => {
  it("Should return the initial state", () => {
    expect(reducer(undefined, { type: "test" })).toEqual(initialState);
  });
  it("Connecting check", () => {
    expect(reducer(initialState, { type: "LIVE_ORDER_WS_CONNECTING" })).toEqual(
      {
        ...initialState,
        status: WebsocketStatus.CONNECTING,
      }
    );
  });
  it("Open check", () => {
    expect(
      reducer(initialState, {
        type: "LIVE_ORDER_WS_OPEN",
      })
    ).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
    });
  });
  it("Close check", () => {
    expect(
      reducer(initialState, {
        type: "LIVE_ORDER_WS_CLOSE",
      })
    ).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    });
  });
  it("Error check", () => {
    const mockError = "Error";
    expect(
      reducer(initialState, {
        type: "LIVE_ORDER_WS_ERROR",
        payload: mockError,
      })
    ).toEqual({
      ...initialState,
      connectingError: mockError,
    });
  });
  it("Message check", () => {
    const mockMessage = "Message";
    expect(
      reducer(initialState, {
        type: "LIVE_ORDER_WS_MESSAGE",
        payload: mockMessage,
      })
    ).toEqual({
      ...initialState,
      data: mockMessage,
    });
  });
});
