import { FC } from "react";
// Components
import BurgerInfo from "../../components/burger-info/burger-info";
// Hooks
import { useAppSelector } from "../../services/hooks";
// Styles
import styles from "./order-page.module.css";
import { useParams } from "react-router-dom";
import { IOrders } from "../../utils/types";

const OrderPage: FC = () => {
  const { orderId } = useParams();
  const { orders } = useAppSelector((store) => store.liveOrders.data);

  const ordersMap = new Map();
  orders.forEach((obj: IOrders) => {
    ordersMap.set(obj.number, obj);
  });
  const { number, name, createdAt, ingredients, status } = ordersMap.get(
    Number(orderId)
  );

  return (
    <div className={styles.page_wrapper}>
      <BurgerInfo
        number={number}
        title={name}
        date={createdAt}
        buregerIngredients={ingredients}
        status={status}
      />
    </div>
  );
};

export default OrderPage;
