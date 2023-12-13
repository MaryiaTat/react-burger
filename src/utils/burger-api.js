import { checkResponse } from "./utils";

const API = "https://norma.nomoreparties.space/api";

export const getIngredientsAPI = () =>
  fetch(`${API}/ingredients`).then(checkResponse);

export const postOrderApi = (content) => {
  return fetch(`${API}/orders`, {
    method: "POST",
    headers: {
      Authorization: "Basic",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  }).then(checkResponse);
};
