import { FC } from "react";
// Components
import ImagesFeed from "../images-feed/images-feed";
// Styles
import styles from "./order-card.module.css";
import { Link } from "react-router-dom";

interface IOrderCard {
  title: string;
  number: number;
  date: string;
  path: string;
  status?: string;
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
  return (
    <Link className={styles.link} to={`/${path}/${number}`}>
      <div className={styles.wrapper}>
        <div className={styles.order_info}>
          <span className={styles.number}>#{number}</span>
          <span className={styles.date}>{date}</span>
        </div>
        <div className={styles.order_status}>
          <span className={styles.title}>{title}</span>
          {isStatusShown && (
            <span className={`${styles.status} ${styles.ready}`}>{status}</span>
          )}
        </div>
        <ImagesFeed data={ingredients} />
      </div>
    </Link>
  );
};

export default OrderCard;
