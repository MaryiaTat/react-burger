import { checkResponse } from "./utils";

const API = "https://norma.nomoreparties.space/api";

export const getIngredients = () =>
  fetch(`${API}/ingredients`).then(checkResponse);
