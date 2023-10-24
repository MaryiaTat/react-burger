import { FC } from "react";
import checkIcon from "../../images/done.svg";
import styles from "./order-details.module.css";

interface OrderDetailsProps {
  orderId: number;
}

const OrderDetails: FC<OrderDetailsProps> = ({ orderId }) => (
  <div className={styles.details}>
    <h1 className={styles.title}>{orderId}</h1>
    <h3 className={styles.sub_title}>идентификатор заказа</h3>
    <img className={styles.image} src={checkIcon} alt="" />
    <span className={styles.info}>Ваш заказ начали готовить</span>
    <span className={styles.note}>
      Дождитесь готовности на орбитальной станции
    </span>
  </div>
);

export default OrderDetails;
