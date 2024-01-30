import { FC } from "react";
// Components
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
// Styles
import styles from "./composition-element.module.css";

interface ICompositionElement {
  image?: string;
  title?: string;
  quantity?: number;
  price?: number;
}

const CompositionElement: FC<ICompositionElement> = ({
  image,
  title,
  quantity,
  price,
}) => {
  return (
    <div className={styles.wrapper}>
      <img src={image} className={styles.image} alt="" />
      <span className={styles.title}>{title}</span>
      <div className={styles.price_wrapper}>
        <span className={styles.price}>{`${quantity}x${price}`}</span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default CompositionElement;
