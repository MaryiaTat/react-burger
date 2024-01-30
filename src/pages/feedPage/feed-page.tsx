import { FC } from "react";
// Components
import OrderCard from "../../components/order-card/order-card";
// Styles
import styles from "./feed-page.module.css";

const FeedPage: FC = () => {
  return (
    <article className={styles.article}>
      <h1 className={styles.title}>Лента заказов</h1>
      <div className={styles.wrapper}>
        <div className={styles.order_feed}>
          <OrderCard
            title="Interstellar бургер"
            number="#034534"
            date="Сегодня, 13:20"
            status="Создан"
          />
          <OrderCard
            title="Interstellar бургер"
            number="#034534"
            date="Сегодня, 13:20"
            status="Создан"
          />
          <OrderCard
            title="Interstellar бургер"
            number="#034534"
            date="Сегодня, 13:20"
            status="Создан"
          />
          <OrderCard
            title="Interstellar бургер"
            number="#034534"
            date="Сегодня, 13:20"
            status="Создан"
          />
          <OrderCard
            title="Interstellar бургер"
            number="#034534"
            date="Сегодня, 13:20"
            status="Создан"
          />
          <OrderCard
            title="Interstellar бургер"
            number="#034534"
            date="Сегодня, 13:20"
            status="Создан"
          />
        </div>
        <div className={styles.order_feed_info}>
          <div className={styles.status_info}>
            <div className={styles.status_wrapper}>
              <span className={styles.status_title}>Готовы:</span>
              <div className={styles.numbers}>
                <span className={`${styles.number} ${styles.ready}`}>
                  034533
                </span>
              </div>
            </div>
            <div className={styles.status_wrapper}>
              <span className={styles.status_title}>В работе:</span>
              <div className={styles.numbers}>
                <span className={styles.number}>034533</span>
                <span className={styles.number}>034533</span>
                <span className={styles.number}>034533</span>
                <span className={styles.number}>034533</span>
                <span className={styles.number}>034533</span>
                <span className={styles.number}>034533</span>
                <span className={styles.number}>034533</span>
                <span className={styles.number}>034533</span>
                <span className={styles.number}>034533</span>
                <span className={styles.number}>034533</span>
                <span className={styles.number}>034533</span>
                <span className={styles.number}>034533</span>
                <span className={styles.number}>034533</span>
              </div>
            </div>
          </div>
          <div className={styles.info}>
            <span className={styles.info_title}>Выполнено за все время:</span>
            <span className={styles.info_sub_title}>28 752</span>
          </div>
          <div className={styles.info}>
            <span className={styles.info_title}>Выполнено за сегодня:</span>
            <span className={styles.info_sub_title}>138</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeedPage;
