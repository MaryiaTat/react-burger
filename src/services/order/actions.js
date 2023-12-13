import { postOrderApi } from "../../utils/burger-api";

export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const ORDER_LOADING = "ORDER_LOADING";
export const ORDER_ERROR = "ORDER_ERROR";
export const DELETE_ORDER = "DELETE_ORDER";

export const postOrder = (order) => (dispatch) => {
  dispatch({ type: ORDER_LOADING });
  return postOrderApi(order)
    .then((res) => {
      dispatch({
        type: POST_ORDER_SUCCESS,
        payload: res.order.number,
      });
    })
    .catch((error) => {
      dispatch({
        type: ORDER_ERROR,
        payload: error.message,
      });
    });
};

export const deleteOrder = () => {
  return { type: DELETE_ORDER };
};
