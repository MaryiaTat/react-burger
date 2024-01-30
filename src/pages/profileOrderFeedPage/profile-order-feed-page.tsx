import { FC } from "react";
// Components
import OrderCard from "../../components/order-card/order-card";
// Styles
import styles from "./profile-order-feed-page.module.css";

const ProfileOrderFeedPage: FC = () => {
  return (
    <div className={styles.page_wrapper}>
      {/* <OrderCard
        title="Interstellar бургер"
        number="034534"
        date="Сегодня, 13:20"
        status="Создан"
        path="profile/orders"
      /> */}
    </div>
  );
};

export default ProfileOrderFeedPage;
