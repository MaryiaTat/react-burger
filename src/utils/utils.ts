import moment from "moment";
import "moment/locale/ru";
import { StatusConstants } from "./constants";

export const checkResponse = <T>(response: Response): Promise<T> =>
  response.ok
    ? response.json()
    : response.json().then((err) => Promise.reject(err));

export const getStatus = (status: StatusConstants | "") => {
  switch (status) {
    case StatusConstants.CREATED:
      return "Создан";
    case StatusConstants.PENDING:
      return " Готовиться";
    case StatusConstants.DONE:
      return "Выполнен";
    default:
      return "";
  }
};

moment.updateLocale("ru", {
  relativeTime: {
    d: "Вчера",
  },
});

export const getOrderDate = (date: string) => moment(date).fromNow();
export const getOrderTime = (date: string) => moment(date).format("LT");
