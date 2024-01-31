import { FC } from "react";
// Components
import BurgerInfo from "../../components/burger-info/burger-info";
// Styles
import styles from "./profile-order-page.module.css";
import { useAppSelector } from "../../services/hooks";
import { useParams } from "react-router-dom";
// Types
import { IOrders } from "../../utils/types";

const ProfileOrderPage: FC = () => {
  const { orderId } = useParams();
  const { orders } = useAppSelector((store) => store.liveUserOrders.data);

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

export default ProfileOrderPage;
