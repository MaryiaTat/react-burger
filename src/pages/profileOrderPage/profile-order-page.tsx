import { FC } from "react";
// Components
import BurgerInfo from "../../components/burger-info/burger-info";
// Styles
import styles from "./profile-order-page.module.css";

const ProfileOrderPage: FC = () => {
  return (
    <div className={styles.page_wrapper}>
      <h1>Hello</h1>
      <BurgerInfo />
    </div>
  );
};

export default ProfileOrderPage;
