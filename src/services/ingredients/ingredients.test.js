import { reducer, initialState } from "./reducer";
import {
  GET_INGREDIENTS_SUCCESS,
  INGREDIENTS_ERROR,
  INGREDIENTS_LOADING,
} from "./actions";

describe("Live orders reducer check", () => {
  it("Should return the initial state", () => {
    expect(reducer(undefined, { type: "test" })).toEqual(initialState);
  });
  it("Get ingredients check", () => {
    const mockIngredients = [
      {
        _id: "643d69a5c3f7b9001cfa093c",
        name: "Краторная булка N-200i",
        type: "bun",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v: 0,
      },
      {
        _id: "643d69a5c3f7b9001cfa0941",
        name: "Биокотлета из марсианской Магнолии",
        type: "main",
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: "https://code.s3.yandex.net/react/code/meat-01.png",
        image_mobile:
          "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
        __v: 0,
      },
    ];
    expect(
      reducer(initialState, {
        type: GET_INGREDIENTS_SUCCESS,
        payload: mockIngredients,
      })
    ).toEqual({
      ...initialState,
      ingredients: mockIngredients,
    });
  });
  it("Ingredients error check", () => {
    const mockError = "Error";
    expect(
      reducer(initialState, {
        type: INGREDIENTS_ERROR,
        payload: mockError,
      })
    ).toEqual({
      ...initialState,
      error: mockError,
    });
  });
  it("Ingredients loading check", () => {
    expect(
      reducer(initialState, {
        type: INGREDIENTS_LOADING,
      })
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });
});
