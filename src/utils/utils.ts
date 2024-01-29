export const checkResponse = <T>(response: Response): Promise<T> =>
  response.ok
    ? response.json()
    : response.json().then((err) => Promise.reject(err));
