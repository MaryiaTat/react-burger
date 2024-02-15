import { reducer, initialState } from "./reducer";
import {
  POST_ORDER_SUCCESS,
  ORDER_LOADING,
  ORDER_SUCCESS,
  ORDER_ERROR,
  DELETE_ORDER,
} from "./actions";

describe("Order reducer check", () => {
  it("Should return the initial state", () => {
    expect(reducer(undefined, { type: "test" })).toEqual(initialState);
  });
  it("Loading check", () => {
    expect(reducer(initialState, { type: ORDER_LOADING })).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it("Error check", () => {
    const mockError = "Error";
    expect(
      reducer(initialState, { type: ORDER_ERROR, payload: mockError })
    ).toEqual({
      ...initialState,
      error: mockError,
    });
  });
  it("Post order number check", () => {
    const mockOrderNumber = 444;
    expect(
      reducer(initialState, {
        type: POST_ORDER_SUCCESS,
        payload: mockOrderNumber,
      })
    ).toEqual({
      ...initialState,
      orderNumber: mockOrderNumber,
    });
  });
  it("Order check", () => {
    const mockOrderNumber = 444;
    expect(
      reducer(initialState, {
        type: ORDER_SUCCESS,
        payload: mockOrderNumber,
      })
    ).toEqual({
      ...initialState,
      currentOrder: mockOrderNumber,
    });
  });
  it("Delete order check", () => {
    expect(
      reducer(initialState, {
        type: DELETE_ORDER,
      })
    ).toEqual({
      ...initialState,
    });
  });
});
