import { reducer, initialState } from "./reducer";
import {
  ADD_CONSTRUCTOR_INGREDIENT_FILLING,
  DELETE_CONSTRUCTOR_INGREDIENT_FILLING,
  ADD_CONSTRUCTOR_INGREDIENT_BUN,
  CLEAR_CONSTRUCTOR,
  SORT_CONSTRUCTOR_INGREDIENT,
} from "./actions";

const initialStateWithIngredients = {
  bun: "0",
  constructorFilling: [
    {
      id: "1",
      elementId: "643d69a5c3f7b9001cfa0943",
    },
    {
      id: "2",
      elementId: "643d69a5c3f7b9001cfa0942",
    },
  ],
};

describe("Live orders reducer check", () => {
  it("Should return the initial state", () => {
    expect(reducer(undefined, { type: "test" })).toEqual(initialState);
  });
  it("Add constructor ingredient filling check", () => {
    const mockIngredientFilling = {
      id: "643d69a5c3f7b9001cfa093c",
      elementId: "643d69a5200i",
    };

    expect(
      reducer(initialState, {
        type: ADD_CONSTRUCTOR_INGREDIENT_FILLING,
        payload: mockIngredientFilling,
      })
    ).toEqual({
      ...initialState,
      constructorFilling: [
        ...initialState.constructorFilling,
        mockIngredientFilling,
      ],
    });
  });
  it("Delete constructor ingredient check", () => {
    const mockIngredientId = "1";
    expect(
      reducer(initialStateWithIngredients, {
        type: DELETE_CONSTRUCTOR_INGREDIENT_FILLING,
        payload: mockIngredientId,
      })
    ).toEqual({
      ...initialStateWithIngredients,
      constructorFilling: [{ id: "2", elementId: "643d69a5c3f7b9001cfa0942" }],
    });
  });
  it("Add constructor ingredient bun check", () => {
    const mockIngredientBun = "643d69a5c3f7b9001cfa093c";
    expect(
      reducer(initialState, {
        type: ADD_CONSTRUCTOR_INGREDIENT_BUN,
        payload: mockIngredientBun,
      })
    ).toEqual({
      ...initialState,
      bun: mockIngredientBun,
    });
  });
  it("Clear constructor check", () => {
    expect(
      reducer(initialState, {
        type: CLEAR_CONSTRUCTOR,
      })
    ).toEqual({
      ...initialState,
    });
  });
  it("Sort constructor check", () => {
    const mockSortData = {
      dragIndex: 0,
      hoverIndex: 1,
    };

    expect(
      reducer(initialStateWithIngredients, {
        type: SORT_CONSTRUCTOR_INGREDIENT,
        payload: mockSortData,
      })
    ).toEqual({
      ...initialStateWithIngredients,
      constructorFilling: [
        {
          id: "2",
          elementId: "643d69a5c3f7b9001cfa0942",
        },
        {
          id: "1",
          elementId: "643d69a5c3f7b9001cfa0943",
        },
      ],
    });
  });
});
