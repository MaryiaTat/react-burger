import { FC } from "react";
import { RingLoader } from "react-spinners";
import styles from "./order-loader.module.css";

const OrderLoader: FC = () => (
  <div className={styles.details}>
    <h1 className={styles.title}>Оформляем заказ...</h1>
    <RingLoader color="#4C4CFF" />
  </div>
);

export default OrderLoader;
