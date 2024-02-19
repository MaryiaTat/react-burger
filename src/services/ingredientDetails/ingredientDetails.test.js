import { reducer, initialState } from "./reducer";
import { ADD_INGREDIENT } from "./actions";

describe("Live orders reducer check", () => {
  it("Should return the initial state", () => {
    expect(reducer(undefined, { type: "test" })).toEqual(initialState);
  });
  it("Add ingredient check", () => {
    const mockIngredient = {
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
    };

    expect(
      reducer(initialState, {
        type: ADD_INGREDIENT,
        payload: mockIngredient,
      })
    ).toEqual({
      ...initialState,
      ingredient: mockIngredient,
    });
  });
});
