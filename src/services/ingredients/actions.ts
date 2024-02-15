import { getIngredientsAPI } from "../../utils/burger-api";
import { AppDispatch } from "../..";

export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const INGREDIENTS_LOADING = "INGREDIENTS_LOADING";
export const INGREDIENTS_ERROR = "INGREDIENTS_ERROR";

export const getIngredients = () => (dispatch: AppDispatch) => {
  dispatch({ type: INGREDIENTS_LOADING });
  return getIngredientsAPI()
    .then((res) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: INGREDIENTS_ERROR,
        payload: error.message,
      });
    });
};
