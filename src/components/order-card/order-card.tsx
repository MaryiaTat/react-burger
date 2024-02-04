import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
// Components
import ImagesFeed from "../images-feed/images-feed";
// Constants
import { getOrderDate, getOrderTime, getStatus } from "../../utils/utils";
// Styles
import styles from "./order-card.module.css";
import { StatusConstants } from "../../utils/constants";

interface IOrderCard {
  title: string;
  number: number;
  date: string;
  path: string;
  status: StatusConstants | "";
  isStatusShown: boolean;
  ingredients: Array<string>;
}

const OrderCard: FC<IOrderCard> = ({
  title,
  number,
  date,
  status,
  path,
  ingredients,
  isStatusShown,
}) => {
  const location = useLocation();
  const orderDate = getOrderDate(date);
  const orderTime = getOrderTime(date);

  const currentStatus = isStatusShown ? getStatus(status) : "";

  return (
    <Link
      className={styles.link}
      to={`/${path}/${number}`}
      state={{ background: location }}
    >
      <div className={styles.wrapper}>
        <div className={styles.order_info}>
          <span className={styles.number}>#{number}</span>
          <span className={styles.date}>
            {orderDate}, {orderTime}
          </span>
        </div>
        <div className={styles.order_status}>
          <span className={styles.title}>{title}</span>
          {isStatusShown && (
            <span
              className={`${styles.status} ${
                status === StatusConstants.DONE ? styles.ready : ""
              }`}
            >
              {currentStatus}
            </span>
          )}
        </div>
        <ImagesFeed data={ingredients} />
      </div>
    </Link>
  );
};

export default OrderCard;
