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
import { StatusConstants, WebsocketStatus } from "../../utils/constants";

const FeedPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(connect(LIVE_ORDER_SERVER_URL_ALL));
    const unsubscribe = async () => {
      dispatch(disconnect());
    };
    unsubscribe();
  }, [dispatch]);

  const { data, status } = useAppSelector((store) => store.liveOrders);
  const map = new Map();
  data?.orders.forEach((obj: IOrders) => {
    map.has(obj.status)
      ? map.set(obj.status, [...map.get(obj.status), obj])
      : map.set(obj.status, [obj]);
  });

  return (
    <article className={styles.article}>
      <h1 className={styles.title}>Лента заказов</h1>
      {status === WebsocketStatus.ONLINE && data && (
        <div className={styles.wrapper}>
          <div className={styles.order_feed}>
            {data?.orders
              .slice(0, 20)
              .map(
                ({ number, name, createdAt, status, ingredients }: IOrders) => (
                  <OrderCard
                    key={number}
                    title={name}
                    number={number}
                    date={createdAt}
                    status={status}
                    isStatusShown={false}
                    ingredients={ingredients}
                    path="feed"
                  />
                )
              )}
          </div>
          <div className={styles.order_feed_info}>
            <div className={styles.status_info}>
              <div className={styles.status_wrapper}>
                <span className={styles.status_title}>Готовы:</span>
                <div className={styles.numbers}>
                  {map
                    .get(StatusConstants.DONE)
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
                    .get(StatusConstants.CREATED)
                    ?.slice(0, 20)
                    .map((el: IOrders) => (
                      <span key={el.number} className={styles.number}>
                        {el.number}
                      </span>
                    ))}
                  {map
                    .get(StatusConstants.PENDING)
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
      )}
    </article>
  );
};

export default FeedPage;
