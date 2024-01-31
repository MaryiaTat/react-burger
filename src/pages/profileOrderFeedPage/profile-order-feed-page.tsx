import { FC, useEffect } from "react";
// Components
import OrderCard from "../../components/order-card/order-card";
// Styles
import styles from "./profile-order-feed-page.module.css";

import { connect, disconnect } from "../../services/liveUserOrders/actions";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
// Constants
import { IOrders } from "../../utils/types";
import { WebsocketStatus } from "../../utils/constants";

const ProfileOrderFeedPage: FC = () => {
  const accessToken = localStorage
    .getItem("accessToken")
    ?.replace("Bearer ", "");
  const LIVE_USER_ORDER_SERVER_URL = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(connect(LIVE_USER_ORDER_SERVER_URL));
    return () => dispatch(disconnect());
  }, [dispatch, LIVE_USER_ORDER_SERVER_URL]);

  const { data, status } = useAppSelector((store) => store.liveUserOrders);

  return data && status === WebsocketStatus.ONLINE ? (
    <div className={styles.page_wrapper}>
      {data?.orders
        ?.slice(0, 20)
        .map(({ number, name, createdAt, status, ingredients }: IOrders) => (
          <OrderCard
            key={number}
            title={name}
            number={number}
            date={createdAt}
            status={status}
            isStatusShown
            ingredients={ingredients}
            path="profile/orders"
          />
        ))}
    </div>
  ) : null;
};

export default ProfileOrderFeedPage;
