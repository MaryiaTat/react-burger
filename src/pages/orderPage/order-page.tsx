import { FC, useEffect } from "react";
// Components
import BurgerInfo from "../../components/burger-info/burger-info";
// import OrderCard from "../../components/ingredient-group copy/order-card";
// Actions
import { connect, disconnect } from "../../services/liveOrders/actions";
// Constants
import { LIVE_ORDER_SERVER_URL_ALL } from "../../utils/burger-api";
// Hooks
import { useAppDispatch, useAppSelector } from "../../services/hooks";
// Styles
import styles from "./order-page.module.css";

const OrderPage: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(connect(LIVE_ORDER_SERVER_URL_ALL));
    return () => dispatch(disconnect());
  }, [dispatch]);

  // const { data, status } = useAppSelector((store) => store.liveOrders);
  // console.log(data);
  // console.log(status);

  return (
    <div className={styles.page_wrapper}>
      <BurgerInfo />
    </div>
  );
};

export default OrderPage;
