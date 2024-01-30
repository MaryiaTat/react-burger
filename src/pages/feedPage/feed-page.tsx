import { FC, useEffect } from "react";
// Components
import OrderCard from "../../components/order-card/order-card";
// Styles
import styles from "./feed-page.module.css";
// Actions
import { connect, disconnect } from "../../services/liveOrders/actions";
// Hooks
import { useAppDispatch, useAppSelector } from "../../services/hooks";
// Constants
import { LIVE_ORDER_SERVER_URL_ALL } from "../../utils/burger-api";
import { IOrders } from "../../utils/types";

const FeedPage: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(connect(LIVE_ORDER_SERVER_URL_ALL));
    return () => dispatch(disconnect());
  }, [dispatch]);
  const { data, status } = useAppSelector((store) => store.liveOrders);
  const map = new Map();
  data?.orders.forEach((obj: IOrders) => {
    map.has(obj.status)
      ? map.set(obj.status, [...map.get(obj.status), obj])
      : map.set(obj.status, [obj]);
  });
  console.log(map);

  return (
    <article className={styles.article}>
      <h1 className={styles.title}>Лента заказов</h1>
      <div className={styles.wrapper}>
        <div className={styles.order_feed}>
          {data?.orders
            .slice(0, 20)
            .map((order: IOrders) => (
              <OrderCard
                key={order.number}
                title={order.name}
                number={order.number}
                date={order.createdAt}
                status={order.status}
                isStatusShown={false}
                ingredients={order.ingredients}
                path="feed"
              />
            ))}
        </div>
        <div className={styles.order_feed_info}>
          <div className={styles.status_info}>
            <div className={styles.status_wrapper}>
              <span className={styles.status_title}>Готовы:</span>
              <div className={styles.numbers}>
                {map
                  .get("done")
                  ?.slice(0, 20)
                  .map((el: IOrders) => (
                    <span
                      key={el.number}
                      className={`${styles.number} ${styles.ready}`}
                    >
                      {el.number}
                    </span>
                  ))}
              </div>
            </div>
            <div className={styles.status_wrapper}>
              <span className={styles.status_title}>В работе:</span>
              <div className={styles.numbers}>
                {map
                  .get("created")
                  ?.slice(0, 20)
                  .map((el: IOrders) => (
                    <span key={el.number} className={styles.number}>
                      {el.number}
                    </span>
                  ))}
                {map
                  .get("pending")
                  ?.slice(0, 20)
                  .map((el: IOrders) => (
                    <span key={el.number} className={styles.number}>
                      {el.number}
                    </span>
                  ))}
              </div>
            </div>
          </div>
          <div className={styles.info}>
            <span className={styles.info_title}>Выполнено за все время:</span>
            <span className={styles.info_sub_title}>{data?.total}</span>
          </div>
          <div className={styles.info}>
            <span className={styles.info_title}>Выполнено за сегодня:</span>
            <span className={styles.info_sub_title}>{data?.totalToday}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeedPage;
