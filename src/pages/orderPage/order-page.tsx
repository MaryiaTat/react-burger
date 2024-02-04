import { FC, useEffect } from "react";
// Components
import BurgerInfo from "../../components/burger-info/burger-info";
// Hooks
import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { getCurrentOrder } from "../../services/order/actions";
// Styles
import styles from "./order-page.module.css";
import { useParams } from "react-router-dom";
import { IOrders } from "../../utils/types";

interface IOrderPage {
  isPage?: boolean;
}

const OrderPage: FC<IOrderPage> = ({ isPage }) => {
  const dispatch = useAppDispatch();
  const { orderId } = useParams();

  const order = useAppSelector((store) => {
    const userOrdersMap = new Map();
    store.liveUserOrders.data?.orders.forEach((obj: IOrders) => {
      userOrdersMap.set(obj.number, obj);
    });
    if (userOrdersMap.has(Number(orderId))) {
      return userOrdersMap.get(Number(orderId));
    }
    const allOrdersMap = new Map();
    store.liveOrders.data?.orders.forEach((obj: IOrders) => {
      allOrdersMap.set(obj.number, obj);
    });
    if (allOrdersMap.has(Number(orderId))) {
      return allOrdersMap.get(Number(orderId));
    }
    if (store.order.currentOrder) return store.order.currentOrder[0];
  });

  useEffect(() => {
    if (!order) {
      dispatch(getCurrentOrder(Number(orderId)));
    }
  }, [dispatch, orderId, order]);

  return order ? (
    <div className={styles.page_wrapper}>
      <BurgerInfo
        number={order.number}
        title={order.name}
        date={order.createdAt}
        buregerIngredients={order.ingredients}
        status={order.status}
        isPage={isPage}
      />
    </div>
  ) : null;
};

export default OrderPage;
