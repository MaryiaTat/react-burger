import { FC } from "react";
// Components
import ImagesFeed from "../images-feed/images-feed";
// Styles
import styles from "./order-card.module.css";

interface IOrderCard {
  title: string;
  number: string;
  date: string;
  status?: string;
}

const OrderCard: FC<IOrderCard> = ({ title, number, date, status }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.order_info}>
        <span className={styles.number}>{number}</span>
        <span className={styles.date}>{date}</span>
      </div>
      <div className={styles.order_status}>
        <span className={styles.title}>{title}</span>
        {status && (
          <span className={`${styles.status} ${styles.ready}`}>{status}</span>
        )}
      </div>
      <ImagesFeed />
    </div>
  );
};

export default OrderCard;
