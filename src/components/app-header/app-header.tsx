import { FC } from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

const AppHeader: FC = () => (
  <header className={styles.header}>
    <nav className={styles.navigation}>
      <a href="/" className={styles.a}>
        <BurgerIcon type="primary" />
        <span className={styles.span}>Конструктор</span>
      </a>
      <a href="/orders" className={styles.a}>
        <ListIcon type="primary" />
        <span className={styles.span}>Лента заказов</span>
      </a>
      <a href="/" className={styles.a}>
        <Logo />
      </a>
      <a href="/account" className={styles.a}>
        <ProfileIcon type="primary" />
        <span className={styles.span}>Личный кабинет</span>
      </a>
    </nav>
  </header>
);

export default AppHeader;
