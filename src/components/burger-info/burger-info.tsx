import { FC } from "react";
// Components
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import CompositionElement from "../composition-element/composition-element";
// Constants
import styles from "./burger-info.module.css";

interface BurgerInfoProps {
  number?: string;
  title?: string;
  date?: string;
  price?: number;
  status?: string;
}

const BurgerInfo: FC<BurgerInfoProps> = ({
  number = "#034533",
  title = "Black Hole Singularity острый бургер",
  date = "Вчера, 13:50",
  price = 510,
  status = "Выполнен",
}) => {
  return (
    <section className={styles.wrapper}>
      <span className={styles.number}>{number}</span>
      <span className={styles.title}>{title}</span>
      <span className={`${styles.status} ${styles.ready}`}>{status}</span>
      <span className={styles.title}>Состав:</span>
      <div className={styles.ingredients}>
        <CompositionElement />
      </div>
      <footer className={styles.footer}>
        <span className={styles.date}>{date}</span>
        <div className={styles.price_wrapper}>
          <span className={styles.price}>{price}</span>
          <CurrencyIcon type="primary" />
        </div>
      </footer>
    </section>
  );
};

export default BurgerInfo;
