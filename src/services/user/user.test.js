import { reducer, initialState } from "./reducer";
import {
  SET_USER,
  SET_IS_AUTH_CHECKED,
  USER_CHANGES_LOADING,
  USER_CHANGES_ERROR,
} from "./actions";

describe("User reducer check", () => {
  it("Should return the initial state", () => {
    expect(reducer(undefined, { type: "test" })).toEqual(initialState);
  });
  it("Loading check", () => {
    expect(reducer(initialState, { type: USER_CHANGES_LOADING })).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it("Error check", () => {
    const mockError = "Error";
    expect(
      reducer(initialState, { type: USER_CHANGES_ERROR, payload: mockError })
    ).toEqual({
      ...initialState,
      error: mockError,
    });
  });
  it("Set user check", () => {
    const mockUser = {
      name: "User",
      email: "user@email.com",
    };
    expect(
      reducer(initialState, { type: SET_USER, payload: mockUser })
    ).toEqual({
      ...initialState,
      user: mockUser,
    });
  });
  it("Auth check", () => {
    const mockAuthCheck = false;
    expect(
      reducer(initialState, {
        type: SET_IS_AUTH_CHECKED,
        payload: mockAuthCheck,
      })
    ).toEqual({
      ...initialState,
      isAuthChecked: mockAuthCheck,
    });
  });
});
