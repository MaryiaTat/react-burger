export const checkResponse = (response) =>
  response.ok
    ? response.json()
    : response.json().then((err) => Promise.reject(err));
