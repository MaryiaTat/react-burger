import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { useAppSelector } from "../../services/hooks";

const AppHeader: FC = () => {
  const name = useAppSelector((store) => store?.user?.user?.name);
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <NavLink to="/" className={styles.link}>
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? "primary" : "secondary"} />
              <span className={isActive ? styles.active_span : styles.span}>
                Конструктор
              </span>
            </>
          )}
        </NavLink>
        <NavLink to="/feed" className={styles.link}>
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? "primary" : "secondary"} />
              <span className={isActive ? styles.active_span : styles.span}>
                Лента заказов
              </span>
            </>
          )}
        </NavLink>
        <Link to="/" className={styles.a}>
          <Logo />
        </Link>
        <NavLink to="/profile" className={styles.link}>
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? "primary" : "secondary"} />
              <span className={isActive ? styles.active_span : styles.span}>
                {name ? name : "Личный кабинет"}
              </span>
            </>
          )}
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;
